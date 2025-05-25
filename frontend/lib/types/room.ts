import { Room, IBooking } from "./booking";

export interface IRoom extends Room {
    amenities: string[];
    bookings?: IBookingResponse[];
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

export interface IBookingResponse {
    checkIn: string;
    checkOut: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    status: string;
}

export interface RoomApiResponse {
    status: string;
    message: string;
    room: Room;
    bookings: IBookingResponse[];
}

export type Booking = IBooking;

export interface BookingResponse {
    status: string;
    message: string;
    data: {
        booking: Booking;
    };
}
