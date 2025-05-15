export interface TransactionsResponse {
    success: boolean;
    transactions: Transaction[];
}

export interface Transaction {
    id: string;
    amount: number;
    transactionid: string;
    requesttransactionid: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    booking: Booking | null;
}

export interface Booking {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    transactionId: string;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
    room: Room;
}

export interface Room {
    id: string;
    name: string;
    description: string;
    images: string[];
    video: string | null;
    available: boolean;
    price: number;
    parkingSpace: number;
    size: string;
    location: string;
    createdAt: string;
    updatedAt: string;
}
  


export interface TransactionDetails {
    [key: string]: string | number | null;
}

export interface RentalTransaction {
    id: string;
    amount: number;
    transactionid: string;
    requesttransactionid: string;
    status: "Pending" | "Failed" | "Success";
    createdAt: string;
    updatedAt: string;
    booking: {
        id: string;
        name: string;
        email: string;
        phoneNumber: string;
        roomId: string;
        checkIn: string;
        checkOut: string;
        totalPrice: number;
        room: {
            id: string;
            name: string;
            description: string;
            price: number;
            location: string;
        };
    } | null;
    details?: TransactionDetails;
  }