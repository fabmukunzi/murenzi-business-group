
export enum TransactionStatus {
    pending = "pending",
    success = "success",
    failed = "failed",
}

export interface TransactionsResponse {
    success: boolean;
    transactions: Transaction[];
}

export interface Transaction {
    id: string;
    amount: number;
    name: string;
    email: string;
    phoneNumber: number;
    type: string;
    transactionid: string;
    requesttransactionid: string;
    status: TransactionStatus;
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
    type: string;
    reason?: string;
    status: TransactionStatus;
    createdAt: string;
    updatedAt: string;
    booking: Booking| null;
    details?: TransactionDetails;
}