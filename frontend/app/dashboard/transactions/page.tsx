"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Check, X, AlertCircle, Eye, TrendingDown, TrendingUp, Loader2, CreditCard, Hash, Clock, CheckCircle, User, Mail, Phone, Calendar, MapPin, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { transactionEndpoints, useGettransactionsQuery } from "@/store/actions/transaction";
import { useDispatch } from "react-redux";
import Pusher from 'pusher-js';
import { RentalTransaction, Transaction } from "@/lib/types/transaction";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TransactionDetails {
  [key: string]: string | number | null;
}

interface StatusUpdatedEventData {
  transactionid: string;
  requesttransactionid: string;
  status: string; // You can narrow this if you use specific status values like: 'pending' | 'Successful' | 'Failed'
}

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    success: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    successfull: "bg-green-100 text-green-800 border-green-200",
  };

  const statusIcons = {
    success: <Check size={14} className="mr-1" />,
    successfull: <Check size={14} className="mr-1" />,
    pending: <AlertCircle size={14} className="mr-1" />,
    failed: <X size={14} className="mr-1" />,
  };

  const style =
    statusStyles[status as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-800";
  const icon = statusIcons[status as keyof typeof statusIcons] || null;

  return (
    <Badge variant="outline" className={`flex items-center justify-center w-fit ${style}`}>
      {icon}
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<RentalTransaction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: transactionsData, isLoading, isError } = useGettransactionsQuery();
  const transactions = transactionsData?.transactions || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
    });

    const channel = pusher.subscribe('transactions');

    channel.bind('status-updated', (data: StatusUpdatedEventData) => {
      console.log('Pusher event received:', data);
      dispatch(transactionEndpoints.util.invalidateTags(['Transaction',"booking"]));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [dispatch]);

  const handleViewDetails = (transaction: RentalTransaction) => {
    const details: TransactionDetails = {
      transactionId: transaction.transactionid,
      requestId: transaction.requesttransactionid,
      transactionDate: new Date(transaction.createdAt).toLocaleString(),
    };

    setSelectedTransaction({
      ...transaction,
      details
    });
    setIsDialogOpen(true);
  };

  const filteredTransactions = transactions.filter((transaction: Transaction) => {
    const searchableText = Object.entries(transaction)
      .map(([key, value]) => {
        if (key === "booking" && value) {
          return Object.values(value).join(" ");
        }
        return String(value);
      })
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchQuery.toLowerCase());
  });

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / pageSize));
  const paginated = filteredTransactions.slice((page - 1) * pageSize, page * pageSize);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  useEffect(() => {
    setPage(1);
  }, [searchQuery, pageSize]);

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Error loading transactions</div>;
  }

  const CopyButton = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    }

    return (
      <Button variant="ghost" size="sm" onClick={handleCopy} className="h-6 w-6 p-0 hover:bg-gray-100">
        {copied ? <CheckCircle className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3 text-gray-500" />}
      </Button>
    )
  }
  return (
    <div className="space-y-4 md:space-y-8 max-w-7xl mx-auto pb-4 md:pb-10 px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Rental Transactions
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Monitor all apartment rental payments
          </p>
        </div>
        <Button variant="outline" className="gap-2 w-full md:w-auto">
          <Download size={16} />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            placeholder="Search transactions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Card>
          <CardContent className="p-0">
            <Table className="min-w-[800px] md:min-w-full max-sm:max-w-screen">
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-gray-600">Transaction ID</TableHead>
                  <TableHead className="text-gray-600">Customer</TableHead>
                  <TableHead className="text-gray-600">Contacts</TableHead>
                  <TableHead className="text-gray-600">Booked Date</TableHead>
                  <TableHead className="text-gray-600">Type</TableHead>
                  <TableHead className="text-gray-600">Amount</TableHead>
                  <TableHead className="text-gray-600">Status</TableHead>
                  <TableHead className="text-gray-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <TableCell key={j}>
                          <Skeleton className="h-4 w-full" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                }
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      <div className="flex justify-center items-center gap-2 text-gray-500 text-sm">
                        <Loader2 className="animate-spin w-5 h-5" />
                        Loading transactions...
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {isError && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-red-500 py-4">
                      Failed to load transactions.
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading && !isError && filteredTransactions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                )}

                {!isLoading &&
                  paginated.map((transaction, i) => (
                    <TableRow
                      key={transaction.id}
                      className={
                        i % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
                      }
                    >
                      <TableCell className="font-medium">
                        {transaction.transactionid.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{transaction.name || "N/A"}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span>{transaction.email}</span>
                          <span className="text-gray-500">{transaction.phoneNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <span>{dayjs(transaction.createdAt).format("YYYY-MM-DD")}</span>
                          <span className="text-gray-500">
                            {dayjs(transaction.createdAt).format("HH:mm")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`capitalize ${transaction.type == "incoming" ? "bg-blue-100 text-blue-500 border-blue-200" : "bg-orange-100 text-orange-500 border-orange-200"}`}>
                          {transaction.type || "N/A"}
                        </Badge>
                      </TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status.toLowerCase()} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(transaction)}
                          className="p-2 sm:px-3"
                        >
                          <Eye size={16} className="mr-0 sm:mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 py-2 border-b">
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Transaction Details
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(85vh-110px)]">
            <div className="px-6 py-4 space-y-6">
              {/* Transaction Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-gray-500" />
                      Transaction Overview
                    </span>
                    <StatusBadge status={`${selectedTransaction?.status}`} />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Hash className="h-4 w-4" />
                        Request Transaction ID
                      </div>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                          {selectedTransaction?.requesttransactionid}
                        </code>
                        <CopyButton text={`${selectedTransaction?.requesttransactionid}`} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        Date & Time
                      </div>
                      <p className="text-sm font-medium">
                        {new Date(`${selectedTransaction?.createdAt}`).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        Amount
                      </div>
                      <p className="text-lg font-bold text-primary">${selectedTransaction?.amount.toLocaleString()}</p>
                    </div>

                    {selectedTransaction?.type && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CreditCard className="h-4 w-4" />
                          Type
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {selectedTransaction.type}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {selectedTransaction?.booking && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      Customer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTransaction?.booking.name && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <User className="h-4 w-4" />
                            Customer Name
                          </div>
                          <p className="font-medium">{selectedTransaction.booking.name}</p>
                        </div>
                      )}

                      {selectedTransaction?.booking.email && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail className="h-4 w-4" />
                            Email Address
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm break-all">{selectedTransaction.booking.email}</p>
                            <CopyButton text={selectedTransaction.booking.email} />
                          </div>
                        </div>
                      )}

                      {selectedTransaction?.booking.phoneNumber && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{selectedTransaction.booking.phoneNumber}</p>
                            <CopyButton text={selectedTransaction.booking.phoneNumber} />
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {selectedTransaction?.booking && (selectedTransaction.booking.checkIn || selectedTransaction.booking.checkOut) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      Booking Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedTransaction.booking.checkIn && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            Check-in Date
                          </div>
                          <p className="font-medium">
                            {new Date(selectedTransaction.booking.checkIn).toLocaleDateString("en-US", {
                              dateStyle: "full",
                            })}
                          </p>
                        </div>
                      )}

                      {selectedTransaction.booking.checkOut && (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            Check-out Date
                          </div>
                          <p className="font-medium">
                            {new Date(selectedTransaction.booking.checkOut).toLocaleDateString("en-US", {
                              dateStyle: "full",
                            })}
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedTransaction?.booking.checkIn && selectedTransaction.booking.checkOut && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-sm text-blue-700">
                          <MapPin className="h-4 w-4" />
                          Duration
                        </div>
                        <p className="text-blue-800 font-medium">
                          {Math.ceil(
                            (new Date(selectedTransaction.booking.checkOut).getTime() -
                              new Date(selectedTransaction.booking.checkIn).getTime()) /
                            (1000 * 60 * 60 * 24),
                          )}{" "}
                          nights
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {selectedTransaction?.details && Object.keys(selectedTransaction.details).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Additional Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(selectedTransaction.details).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0"
                        >
                          <span className="text-sm font-medium text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </span>
                          <span className="text-sm text-right break-all max-w-[60%]">
                            {typeof value === "object" ? JSON.stringify(value, null, 2) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>

          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-gray-200 hover:bg-gray-300">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
            {[5, 10, 15, 20, 25].map((size) => (
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
            Previous
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