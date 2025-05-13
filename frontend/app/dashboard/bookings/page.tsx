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
import { useGetBookingsQuery } from '@/store/actions/booking';
import { useState } from 'react';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

function StatusBadge({ status }: { status: string }) {
  const statusColor = {
    completed: 'bg-green-100 text-green-800',
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

export default function BookingsTable() {
  const { data, isLoading, isError } = useGetBookingsQuery();
  const [search, setSearch] = useState('');

  const filtered = data?.data?.bookings?.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      b.phoneNumber.includes(search)
  );

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
              <TableHead className="text-gray-600">Email</TableHead>
              <TableHead className="text-gray-600">Phone</TableHead>
              <TableHead className="text-gray-600">Room</TableHead>
              <TableHead className="text-gray-600">Image</TableHead>
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
              filtered?.map((booking, i) => (
                <TableRow
                  key={booking.id}
                  className={
                    i % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'
                  }
                >
                  <TableCell className="font-medium">{booking.name}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{booking.phoneNumber}</TableCell>
                  <TableCell>{booking.room?.name || '-'}</TableCell>
                  <TableCell>
                    {booking.room?.images?.length > 0 ? (
                      <Image
                        src={booking.room.images[0]}
                        alt={booking.room.name}
                        width={100}
                        height={100}
                        className="h-10 w-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        No image
                      </span>
                    )}
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
    </div>
  );
}
