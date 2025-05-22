import { Room, IBooking } from "./booking";

export interface IRoom extends Room {
    amenities: string[];
}

export interface BookingPayload {
    name: string;
    email: string;
    phoneNumber: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
}

// Use IBooking from booking.ts
export type Booking = IBooking;

export interface BookingResponse {
    status: string;
    message: string;
    data: {
        booking: Booking;
    };
}
