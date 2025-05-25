"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Check, X, AlertCircle, Eye, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
      createdAt: new Date(transaction.createdAt).toLocaleString(),
      updatedAt: new Date(transaction.updatedAt).toLocaleString(),
    };

    if (transaction.booking) {
      details.checkIn = new Date(transaction.booking.checkIn).toLocaleDateString();
      details.checkOut = new Date(transaction.booking.checkOut).toLocaleDateString();
      details.guests = "-";
      details.specialRequests = "-";
    }

    setSelectedTransaction({
      ...transaction,
      details
    });
    setIsDialogOpen(true);
  };

  // Filter transactions based on search query
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

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center h-screen">Error loading transactions</div>;
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
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Contact</TableHead>
                  <TableHead>Flow</TableHead>
                  <TableHead className="hidden xs:table-cell">Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction: Transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.transactionid.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {transaction?.name || "N/A"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">
                          {transaction?.email || "N/A"}
                        </span>
                        <span className="text-xs">
                          {transaction?.phoneNumber || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">  
                          {transaction?.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {transaction?.type === "incoming" ? <TrendingDown className="text-green-600/70" /> : <TrendingUp className="text-destructive/70" />}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden xs:table-cell">
                      {new Date(transaction.createdAt).toLocaleDateString()}
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

      {/* Transaction Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">Transaction Details</DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Transaction ID</h3>
                  <p className="text-sm sm:text-base break-all">{selectedTransaction.transactionid}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="text-sm sm:text-base">{new Date(selectedTransaction.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                  <p className="text-sm sm:text-base">{selectedTransaction?.booking?.name || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-sm sm:text-base break-all">{selectedTransaction.booking?.email || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="text-sm sm:text-base">{selectedTransaction.booking?.phoneNumber || "N/A"}</p>
                </div> 
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="text-sm sm:text-base">{selectedTransaction?.type || "N/A"}</p>
                </div>
                {selectedTransaction.booking && (
                  <>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Check In</h3>
                      <p className="text-sm sm:text-base">{new Date(selectedTransaction.booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Check Out</h3>
                      <p className="text-sm sm:text-base">{new Date(selectedTransaction.booking.checkOut).toLocaleDateString()}</p>
                    </div>
                  </>
                )}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p className="text-sm sm:text-base">${selectedTransaction.amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="mt-1">
                    <StatusBadge status={selectedTransaction.status} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Details</h3>
                <Card>
                  <CardContent className="p-2 sm:p-4">
                    {selectedTransaction.details && Object.entries(selectedTransaction.details).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between py-1 text-sm">
                          <span className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span className="text-right break-all">{String(value)}</span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="mt-2 sm:mt-0"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-500">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}