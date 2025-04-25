import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { RoomService } from '../services/room.service';
import { TransactionService } from '../services/transaction.service';

const bookService = new BookService();
const roomService = new RoomService();

export const createBooking = async (req: Request, res: Response) => {
    try {
        const { name, email, roomId, checkIn, checkOut, totalPrice, phoneNumber } = req.body;
        if (!name || !email || !roomId || !checkIn || !checkOut || !totalPrice) {
            res.status(400).json({
                status: 'error',
                message: 'All fields are required: name, email, roomId, checkIn, checkOut, transactionId, totalPrice',
            });
            return
        }

        const existingRoom = await roomService.getRoomById(roomId);

        if (new Date(checkIn) >= new Date(checkOut)) {
            res.status(400).json({
                status: 'error',
                message: 'Check-out date must be later than check-in date',
            });
            return
        }
        if (!totalPrice || !phoneNumber) {
            res.status(400).json({
                status: "error",
                message: "Amount and mobilephone are required",
            });
            return
        }

        const payload = {
            username: "testa",
            timestamp: "20161231115242",
            password: "71c931d4966984a90cee2bcc2953ce432899122b0f16778e5f4845d5ea18f7e6",
            mobilephone: phoneNumber,
            amount: totalPrice,
            requesttransactionid: Date.now(),
            callbackurl: "https://fabrand.vercel.app/"
        };

        let paymentResponse;
        if (!existingRoom) {
            res.status(404).json({
                status: 'error',
                message: 'Room not found',
            });
            return
        }
        else {
            const response = await fetch("https://www.intouchpay.co.rw/api/requestpayment/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            paymentResponse = await data;
            console.log("Payment response:", response);
        }
        console.log(
            "Payment response:", paymentResponse, "Payload:", payload, "Total Price:", totalPrice, "Phone Number:", phoneNumber, "Check In:", checkIn, "Check Out:", checkOut, "Room ID:", roomId, "Email:", email, "Name:", name
        );
        

        const transaction = await TransactionService.createTransaction({
            amount: parseFloat(totalPrice),
            transactionid: paymentResponse.transactionid,
            requesttransactionid: paymentResponse.requesttransactionid,
            status: paymentResponse.status,
        });

        if (!transaction) {
            res.status(500).json({
                status: 'error',
                message: 'Transaction creation failed',
            });
            return
        }
        const booking = await bookService.create({
            name,
            email,
            roomId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            transactionId: transaction.id,
            totalPrice: parseFloat(totalPrice),
            phoneNumber,
        });
        
        res.status(201).json({
            status: 'success',
            message: paymentResponse.message,
            data: { booking },
        });
    } catch (error: any) {
        console.log("Error creating booking:", error.message);

        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await bookService.getAll();
        res.status(200).json({
            status: 'success',
            message: 'Bookings retrieved successfully',
            data: { bookings },
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const getBookingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const booking = await bookService.getById(id);
        if (!booking) {
            res.status(404).json({
                status: 'error',
                message: 'Booking not found',
            });
            return
        }

        res.status(200).json({
            status: 'success',
            message: 'Booking retrieved successfully',
            data: { booking },
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const updateBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const existingBooking = await bookService.getById(id);
        if (!existingBooking) {
            res.status(404).json({
                status: 'error',
                message: 'Booking not found',
            });
            return
        }

        const updatedBooking = await bookService.update(id, data);

        res.status(200).json({
            status: 'success',
            message: 'Booking updated successfully',
            data: { updatedBooking },
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const deleteBooking = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingBooking = await bookService.getById(id);
        if (!existingBooking) {
            res.status(404).json({
                status: 'error',
                message: 'Booking not found',
            });
            return
        }

        await bookService.delete(id);

        res.status(200).json({
            status: 'success',
            message: 'Booking deleted successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};