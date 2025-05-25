import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import { TransactionService } from '../services/transaction.service';
import { generateRequestTransactionId } from '../utils/requestTransactionId';
import { bookingService } from '../services/book.service';

const roomService = new RoomService();

export const createBooking = async (req: Request, res: Response) => {
    try {
        let { name, email, roomId, checkIn, checkOut, totalPrice, phoneNumber } = req.body;
        totalPrice = parseFloat(totalPrice);
        phoneNumber = Number(phoneNumber);
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
        if (!/^\d{12}$/.test(phoneNumber)) {
            res.status(400).json({
                status: 'error',
                message: 'Phone number must be a valid 12-digit number (e.g., 2507XXXXXXXX)',
            });
            return
        }

        const payload = {
            username: process.env.INTOUCHPAY_USERNAME,
            timestamp: "20161231115242",
            password: process.env.INTOUCHPAY_PASSWORD,
            mobilephone: phoneNumber,
            amount: totalPrice,
            requesttransactionid: generateRequestTransactionId(),
            callbackurl: process.env.CALLBACK_URL
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
            const response = await fetch(`${process.env.INTOUCH_BASE_URL}/requestpayment/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            paymentResponse = await data;
        }
        if (paymentResponse.responsecode == 2300) {
            res.status(400).json({
                status: 'error',
                message: paymentResponse.message,
                success: paymentResponse.success,
                responsecode: paymentResponse.responsecode,
            });
            return
        }
        if (paymentResponse.responsecode == 2200) {
            res.status(400).json({
                status: 'error',
                message: paymentResponse.message,
                success: paymentResponse.success,
                responsecode: paymentResponse.responsecode,
            });
            return
        }


        const transaction = await TransactionService.createTransaction({
            amount: totalPrice,
            name,
            email,
            phoneNumber:`${phoneNumber}`,
            transactionid: paymentResponse.transactionid,
            requesttransactionid: paymentResponse.requesttransactionid.toString(),
            status: paymentResponse.status,
            reason: "Room Booking",
            type: "incoming",
        });


        if (!transaction) {
            res.status(500).json({
                status: 'error',
                message: 'Transaction creation failed',
            });
            return
        }
        const booking = await bookingService.create({
            name,
            email,
            roomId,
            checkIn: new Date(checkIn),
            checkOut: new Date(checkOut),
            transactionId: transaction.id,
            totalPrice: parseFloat(totalPrice),
            phoneNumber: phoneNumber.toString(),
        });

        res.status(201).json({
            status: paymentResponse.status,
            message: paymentResponse.message,
            data: { booking },
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await bookingService.getAll();
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

        const booking = await bookingService.getBookingById(id);
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

        const existingBooking = await bookingService.getBookingById(id);
        if (!existingBooking) {
            res.status(404).json({
                status: 'error',
                message: 'Booking not found',
            });
            return
        }

        const updatedBooking = await bookingService.update(id, data);

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
        const existingBooking = await bookingService.getBookingById(id);
        if (!existingBooking) {
            res.status(404).json({
                status: 'error',
                message: 'Booking not found',
            });
            return
        }

        await bookingService.delete(id);

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
