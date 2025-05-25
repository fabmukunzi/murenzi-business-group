'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { bookingEndpoints, useGetBookingsQuery } from '@/store/actions/booking';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { Loader2 } from 'lucide-react';
import Pusher from 'pusher-js';
import { useDispatch } from 'react-redux';

function StatusBadge({ status }: { status: string }) {
  const statusColor = {
    success: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    unknown: 'bg-gray-100 text-gray-800',
  };


  const color =
    statusColor[status?.toLowerCase() as keyof typeof statusColor] ||
    statusColor.unknown;

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${color}`}
    >
      {status || 'Unknown'}
    </span>
  );
}
interface StatusUpdatedEventData {
  transactionid: string;
  requesttransactionid: string;
  status: string;
}

export default function BookingsTable() {
  const { data, isLoading, isError } = useGetBookingsQuery();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);


  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });

    const channel = pusher.subscribe('transactions');

    channel.bind('status-updated', (data: StatusUpdatedEventData) => {
      console.log('Pusher event received:', data);
      dispatch(bookingEndpoints.util.invalidateTags(["booking"]));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    setPage(1);
  }, [search, pageSize])
  const filtered = data?.data?.bookings?.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.phoneNumber.includes(search)
  ) || [];

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));


  const handleExport = () => {
    const rows =
      filtered?.map((b) => ({
        Guest: b.name,
        Email: b.email,
        Phone: b.phoneNumber,
        Room: b.room?.name,
        'Check-In': dayjs(b.checkIn).format('YYYY-MM-DD'),
        'Check-Out': dayjs(b.checkOut).format('YYYY-MM-DD'),
        'Total Price (RWF)': b.totalPrice,
        Status: b.transaction?.status ?? 'Unknown',
      })) || [];

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    XLSX.writeFile(workbook, 'bookings.xlsx');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-800">Bookings Overview</h2>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search by name, email or phone..."
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleExport}>Export to Excel</Button>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="overflow-x-auto rounded-xl border shadow-sm bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="text-gray-600">Guest</TableHead>
              <TableHead className="text-gray-600">Contacts</TableHead>
              <TableHead className="text-gray-600">Room</TableHead>
              <TableHead className="text-gray-600">Booked Date</TableHead>
              <TableHead className="text-gray-600">Check-In</TableHead>
              <TableHead className="text-gray-600">Check-Out</TableHead>
              <TableHead className="text-gray-600">Total Price</TableHead>
              <TableHead className="text-gray-600">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 9 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {isLoading && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Loading bookings...
                  </div>
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center text-red-500 py-4"
                >
                  Failed to load bookings.
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && filtered?.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              paginated?.map((booking, i) => (
                <TableRow
                  key={booking.id}
                  className={
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }
                >
                  <TableCell className="font-medium">{booking.name}</TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <span>{booking.email}</span>
                      <span className='text-gray-500'>{booking.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>{booking.room?.name || '-'}</TableCell>
                  <TableCell>
                    <div className='flex gap-2'>
                      <span>{dayjs(booking.createdAt).format('YYYY-MM-DD')}</span>
                      <span className="text-gray-500">
                        {dayjs(booking.createdAt).format('HH:mm')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {dayjs(booking.checkIn).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell>
                    {dayjs(booking.checkOut).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell>
                    RWF {booking.totalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={booking.transaction?.status ?? 'unknown'}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <label htmlFor="pageSize" className="text-sm text-gray-600">
            Page Size:
          </label>
          <select
            id="pageSize"
            className="border rounded px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[4,7,10, 13, 16, 19, 22].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end items-center gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Prev
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
