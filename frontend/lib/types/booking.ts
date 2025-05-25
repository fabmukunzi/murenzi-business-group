// types/booking.ts

import { Transaction } from "./transaction";

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
  location: string |undefined;
  createdAt: string;
  updatedAt: string;
  bookings?: IBookingResponse[];
}

export interface IBookingResponse {
  checkIn: string;
  checkOut: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: string;
}


export interface IBooking {
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
  transaction: Transaction;
}
