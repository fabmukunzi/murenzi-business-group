import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoomService {
    async createRoom(data: any) {
        return await prisma.room.create({ data });
    }

    async getAllRooms() {
        const rooms = await prisma.room.findMany({
            where:{
                isDeleted: false
            }
        });
        const today = new Date();

        const roomsWithAvailability = await Promise.all(
            rooms.map(async (room) => {
                const bookings = await prisma.booking.findMany({
                    where: {
                        roomId: room.id,
                        transaction: {
                            is: { status: { in: ['success', 'Successfull'] } },
                        },
                    },
                    orderBy: { checkIn: 'asc' },
                });

                let available = true;
                let availableUntil: Date | null = null;
                let bookedUntil: Date | null = null;

                // Find current booking
                const currentBooking = bookings.find(
                    (b) => new Date(b.checkIn) <= today && new Date(b.checkOut) >= today
                );

                // Find the next future booking (after today)
                const nextBooking = bookings.find((b) => new Date(b.checkIn) > today);

                if (currentBooking) {
                    available = false;
                    bookedUntil = currentBooking.checkOut;
                    // Even when booked, show when it will be available (after current booking ends)
                    availableUntil = nextBooking ? nextBooking.checkIn : null;
                } else {
                    available = true;
                    availableUntil = nextBooking ? nextBooking.checkIn : null;
                    // When available, show when it will be booked next (if there's an immediate next booking)
                    bookedUntil = nextBooking ? nextBooking.checkOut : null;
                }

                return {
                    ...room,
                    available,
                    availableUntil,
                    bookedUntil,
                };
            })
        );

        return roomsWithAvailability;
    }

    async getRoomById(id: string) {
        const room = await prisma.room.findUnique({
            where: { id },
            include: {
                Booking: {
                    where: {
                        transaction: {
                            status: { in: ['success', 'Successfull'] }
                        }
                    },
                    select: {
                        checkIn: true,
                        checkOut: true,
                        name: true,
                        email: true,
                        phoneNumber: true,
                        transaction: {
                            select: {
                                status: true
                            }
                        }
                    },
                    orderBy: {
                        checkIn: 'asc'
                    }
                }
            }
        });

        if (!room) return null;

        // Transform the bookings to a simpler format
        const bookings = room.Booking.map(booking => ({
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            guestName: booking.name,
            guestEmail: booking.email,
            guestPhone: booking.phoneNumber,
            status: booking.transaction.status
        }));

        return {
            ...room,
            bookings
        };
    }

    async getRoomByName(name: string) {
        return await prisma.room.findUnique({ where: { name } });
    }

    async updateRoom(id: string, data: any) {
        return await prisma.room.update({ where: { id }, data });
    }

    async deleteRoom(id: string) {
        return await prisma.room.update({ where: { id },data: { isDeleted: true } });
    }
}
