"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Home,
  Coffee,
  Bath,
  Check,
  X,
  AlertCircle,
  ChevronDown,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

interface BaseTransaction {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  paymentMethod: string;
  details: TransactionDetails;
}

interface RentalTransaction extends BaseTransaction {
  property: string;
  duration: string;
}

interface RestaurantTransaction extends BaseTransaction {
  items: string[];
}

interface SpaTransaction extends BaseTransaction {
  service: string;
}

// Mock transactions data with typed structure
const transactions: {
  rentals: RentalTransaction[];
  restaurant: RestaurantTransaction[];
  saunaMassage: SpaTransaction[];
} = {
  rentals: [
    {
      id: "R12345",
      customer: "John Smith",
      date: "2025-05-15",
      property: "Luxury Apartment",
      amount: 450,
      duration: "3 nights",
      status: "completed",
      paymentMethod: "Credit Card",
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
      date: "2025-05-18",
      property: "Modern Studio",
      amount: 200,
      duration: "2 nights",
      status: "upcoming",
      paymentMethod: "PayPal",
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
      date: "2025-05-10",
      property: "Deluxe Villa",
      amount: 1200,
      duration: "4 nights",
      status: "cancelled",
      paymentMethod: "Bank Transfer",
      details: {
        checkin: "2023-05-20",
        checkout: "2023-05-24",
        guests: 4,
        specialRequests: "Airport pickup requested",
      },
    },
  ],
  restaurant: [
    {
      id: "F12345",
      customer: "David Wilson",
      date: "2025-05-19",
      items: ["Continental Breakfast", "Coffee"],
      amount: 22,
      status: "completed",
      paymentMethod: "Cash",
      details: {
        time: "08:30",
        specialRequests: "Gluten-free options",
        tableNumber: "12",
      },
    },
    {
      id: "F12346",
      customer: "Emma Brown",
      date: "2025-05-19",
      items: ["Beef Burger", "Craft Beer Selection"],
      amount: 23,
      status: "processing",
      paymentMethod: "Credit Card",
      details: {
        time: "13:15",
        specialRequests: "Extra sauce on the side",
        tableNumber: "8",
      },
    },
    {
      id: "F12347",
      customer: "Michael Davis",
      date: "2025-05-18",
      items: ["Grilled Salmon", "House Red Wine", "Vegetarian Curry"],
      amount: 62,
      status: "completed",
      paymentMethod: "Mobile Payment",
      details: {
        time: "19:45",
        specialRequests: "No pepper in curry",
        tableNumber: "15",
      },
    },
  ],
  saunaMassage: [
    {
      id: "S12345",
      customer: "Jennifer Lee",
      date: "2025-05-19",
      service: "Swedish Massage",
      amount: 75,
      status: "upcoming",
      paymentMethod: "Credit Card",
      details: {
        time: "14:00",
        duration: "60 min",
        therapist: "Sarah",
        notes: "First-time client",
      },
    },
    {
      id: "S12346",
      customer: "Thomas White",
      date: "2025-05-18",
      service: "Traditional Sauna",
      amount: 35,
      status: "completed",
      paymentMethod: "Gift Card",
      details: {
        time: "16:00",
        duration: "45 min",
        therapist: "N/A",
        notes: "Regular client",
      },
    },
    {
      id: "S12347",
      customer: "Michelle Taylor",
      date: "2025-05-17",
      service: "Deluxe Spa Package",
      amount: 220,
      status: "cancelled",
      paymentMethod: "Mobile Money",
      details: {
        time: "10:00",
        duration: "180 min",
        therapist: "James",
        notes: "Cancellation due to illness",
      },
    },
  ],
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    completed: "bg-green-100 text-green-800 border-green-200",
    upcoming: "bg-blue-100 text-blue-800 border-blue-200",
    processing: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  const statusIcons = {
    completed: <Check size={14} className="mr-1" />,
    upcoming: <AlertCircle size={14} className="mr-1" />,
    processing: <AlertCircle size={14} className="mr-1" />,
    cancelled: <X size={14} className="mr-1" />,
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

type TransactionTab = "rentals" | "restaurant" | "saunaMassage";
type Transaction = RentalTransaction | RestaurantTransaction | SpaTransaction;

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<TransactionTab>("rentals");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  // Filter transactions based on search query and status
  const filteredTransactions = transactions[activeTab].filter((transaction) => {
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

    const matchesSearch = searchableText.includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === null || transaction.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Handle status filter change
  const handleStatusFilterChange = (status: string | null) => {
    setStatusFilter(status);
  };

  // Render rental row
  const renderRentalRow = (transaction: RentalTransaction) => (
    <TableRow key={transaction.id}>
      <TableCell className="font-medium">{transaction.id}</TableCell>
      <TableCell>{transaction.customer}</TableCell>
      <TableCell>{transaction.property}</TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>${transaction.amount}</TableCell>
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
  );

  // Render restaurant row
  const renderRestaurantRow = (transaction: RestaurantTransaction) => (
    <TableRow key={transaction.id}>
      <TableCell className="font-medium">{transaction.id}</TableCell>
      <TableCell>{transaction.customer}</TableCell>
      <TableCell>
        {Array.isArray(transaction.items) && transaction.items.length > 0
          ? transaction.items.join(", ")
          : "No items"}
      </TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>${transaction.amount}</TableCell>
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
  );

  // Render spa row
  const renderSpaRow = (transaction: SpaTransaction) => (
    <TableRow key={transaction.id}>
      <TableCell className="font-medium">{transaction.id}</TableCell>
      <TableCell>{transaction.customer}</TableCell>
      <TableCell>{transaction.service}</TableCell>
      <TableCell>{transaction.date}</TableCell>
      <TableCell>${transaction.amount}</TableCell>
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
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-500 mt-1">
            Monitor all business transactions
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
        <div className="flex gap-2 self-end">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter size={14} />
            <span>Filter</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <span>Status: {statusFilter || "All"}</span>
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusFilterChange(null)}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusFilterChange("completed")}
              >
                Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusFilterChange("upcoming")}
              >
                Upcoming
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusFilterChange("processing")}
              >
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusFilterChange("cancelled")}
              >
                Cancelled
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs
        defaultValue="rentals"
        value={activeTab}
        onValueChange={(value) => {
          // Cast the string value to our type to satisfy TypeScript
          if (
            value === "rentals" ||
            value === "restaurant" ||
            value === "saunaMassage"
          ) {
            setActiveTab(value);
          }
        }}
      >
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="rentals" className="flex items-center gap-2">
            <Home size={16} />
            <span>Rentals</span>
          </TabsTrigger>
          <TabsTrigger value="restaurant" className="flex items-center gap-2">
            <Coffee size={16} />
            <span>Restaurant</span>
          </TabsTrigger>
          <TabsTrigger value="saunaMassage" className="flex items-center gap-2">
            <Bath size={16} />
            <span>Sauna & Massage</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rentals" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) =>
                    renderRentalRow(transaction as RentalTransaction)
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restaurant" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) =>
                    renderRestaurantRow(transaction as RestaurantTransaction)
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saunaMassage" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) =>
                    renderSpaRow(transaction as SpaTransaction)
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
                {selectedTransaction.status === "upcoming" && (
                  <Button variant="destructive">Cancel Booking</Button>
                )}
                {selectedTransaction.status === "processing" && (
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
          Showing {filteredTransactions.length} of{" "}
          {transactions[activeTab].length} transactions
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
