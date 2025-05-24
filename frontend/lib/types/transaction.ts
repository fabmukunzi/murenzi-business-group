import { IBooking } from "./booking";

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
    booking: IBooking | null;
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
    booking: IBooking | null;
    details?: TransactionDetails;
}