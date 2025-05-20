import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class BookingService {
    async create(data: any) {
        const overlappingBooking = await prisma.booking.findFirst({
            where: {
                roomId: data.roomId,
                checkIn: { lte: new Date(data.checkOut) },
                checkOut: { gte: new Date(data.checkIn) },
                transaction: {
                    is: { status: 'Successfull' },
                },
            },
        });
        if (overlappingBooking) {
            throw new Error('The selected room is already booked for the given dates.');
        }

        return await prisma.booking.create({ data });
    }

    async getAll() {
        return await prisma.booking.findMany({ include: { room: true, transaction: true } });
    }

    async getBookingById(id: string) {
        return await prisma.booking.findUnique({
            where: { id },
            include: { room: true, transaction: true },
        });
    }

    async update(id: string, data: any) {
        return await prisma.booking.update({ where: { id }, data });
    }

    async delete(id: string) {
        return await prisma.booking.delete({ where: { id } });
    }
    async getBookingByRoomId(roomId: string) {
        return await prisma.booking.findFirst({
            where: { roomId },
            include: { room: true, transaction: true },
        });
    }
}

export const bookingService = new BookingService();