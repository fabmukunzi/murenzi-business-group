export interface IRoom {
    id: string;
    name: string;
    price: number;
    location: string;
    parkingSpace: number;
    size: string;
    description: string;
    images: string[];
    video: string;
    amenities: string[];
    createdAt: string;
    updatedAt: string;
};


export interface BookingPayload {
    name: string;
    email: string;
    phoneNumber: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    totalPrice: number;
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
}

export interface BookingResponse {
    status: string; 
    message: string;
    data: {
        booking: Booking;
    };
}
