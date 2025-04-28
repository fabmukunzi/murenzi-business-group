"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Check, X, AlertCircle, Eye } from "lucide-react";
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

// Define transaction interfaces
interface TransactionDetails {
  [key: string]: string | number;
}

interface RentalTransaction {
  id: string;
  customer: string;
  email: string;
  phone: string;
  date: string;
  property: string;
  amount: number;
  duration: string;
  status: "pending" | "failed" | "success";
  paymentMethod: string;
  correspondent: string;
  details: TransactionDetails;
}

// Mock transactions data
const transactions: RentalTransaction[] = [
  {
    id: "R12345",
    customer: "John Smith",
    email: "john.smith@example.com",
    phone: "+250789123456",
    date: "2025-05-15",
    property: "Luxury Apartment",
    amount: 450,
    duration: "3 nights",
    status: "success",
    paymentMethod: "Credit Card",
    correspondent: "Visa",
    details: {
      checkin: "2023-05-15",
      checkout: "2023-05-18",
      guests: 2,
      specialRequests: "Late check-in requested",
    },
  },
  {
    id: "R12346",
    customer: "Melvin KAGABO",
    email: "melvin.k@example.com",
    phone: "+250782956478",
    date: "2025-05-18",
    property: "Modern Studio",
    amount: 200,
    duration: "2 nights",
    status: "pending",
    paymentMethod: "Mobile Money",
    correspondent: "MTN MoMo",
    details: {
      checkin: "2023-06-01",
      checkout: "2023-06-03",
      guests: 1,
      specialRequests: "None",
    },
  },
  {
    id: "R12347",
    customer: "Raphael MUGABO",
    email: "raphael.m@example.com",
    phone: "+250733111222",
    date: "2025-05-10",
    property: "Deluxe Villa",
    amount: 1200,
    duration: "4 nights",
    status: "failed",
    paymentMethod: "Bank Transfer",
    correspondent: "Bank of Kigali",
    details: {
      checkin: "2023-05-20",
      checkout: "2023-05-24",
      guests: 4,
      specialRequests: "Airport pickup requested",
    },
  },
  {
    id: "R12348",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+250781234567",
    date: "2025-05-20",
    property: "Ocean View Suite",
    amount: 550,
    duration: "5 nights",
    status: "success",
    paymentMethod: "Mobile Money",
    correspondent: "MTN MoMo",
    details: {
      checkin: "2023-05-25",
      checkout: "2023-05-30",
      guests: 2,
      specialRequests: "Ocean view room requested",
    },
  },
  {
    id: "R12349",
    customer: "Daniel Kamau",
    email: "daniel.k@example.com",
    phone: "+250722987654",
    date: "2025-05-22",
    property: "Mountain Cabin",
    amount: 320,
    duration: "3 nights",
    status: "pending",
    paymentMethod: "Credit Card",
    correspondent: "Mastercard",
    details: {
      checkin: "2023-06-05",
      checkout: "2023-06-08",
      guests: 3,
      specialRequests: "Hiking equipment rental",
    },
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    success: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
  };

  const statusIcons = {
    success: <Check size={14} className="mr-1" />,
    pending: <AlertCircle size={14} className="mr-1" />,
    failed: <X size={14} className="mr-1" />,
  };

  const style =
    statusStyles[status as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-800";
  const icon = statusIcons[status as keyof typeof statusIcons] || null;

  return (
    <Badge variant="outline" className={`flex items-center ${style}`}>
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

  const handleViewDetails = (transaction: RentalTransaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter((transaction) => {
    // Safely stringify transaction values for search
    const searchableText = Object.entries(transaction)
      .map(([key, value]) => {
        // Skip complex objects but include primitive values and arrays that can be joined
        if (key === "details") return "";
        if (Array.isArray(value)) return value.join(" ");
        return String(value);
      })
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Rental Transactions
          </h1>
          <p className="text-gray-500 mt-1">
            Monitor all apartment rental payments
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          <span>Export</span>
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

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">
                        {transaction.email}
                      </span>
                      <span className="text-xs">{transaction.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.property}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>${transaction.amount}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{transaction.paymentMethod}</span>
                      <span className="text-xs text-gray-500">
                        {transaction.correspondent}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(transaction)}
                    >
                      <Eye size={16} className="mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
          </DialogHeader>

          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ID</h3>
                  <p>{selectedTransaction.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p>{selectedTransaction.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Customer
                  </h3>
                  <p>{selectedTransaction.customer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p>{selectedTransaction.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p>{selectedTransaction.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Property
                  </h3>
                  <p>{selectedTransaction.property}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Duration
                  </h3>
                  <p>{selectedTransaction.duration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount</h3>
                  <p>${selectedTransaction.amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <StatusBadge status={selectedTransaction.status} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Payment Method
                  </h3>
                  <p>{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Correspondent
                  </h3>
                  <p>{selectedTransaction.correspondent}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Details
                </h3>
                <Card>
                  <CardContent className="p-4">
                    {Object.entries(selectedTransaction.details).map(
                      ([key, value]) => (
                        <div key={key} className="flex justify-between py-1">
                          <span className="text-sm font-medium capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </span>
                          <span className="text-sm">{String(value)}</span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Close
                </Button>
                {selectedTransaction.status === "pending" && (
                  <Button className="bg-primary hover:bg-primary/90">
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredTransactions.length} of {transactions.length}{" "}
          transactions
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
