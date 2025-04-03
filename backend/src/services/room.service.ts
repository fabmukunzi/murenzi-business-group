import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoomService {
    async createRoom(data: any) {
        return await prisma.room.create({ data });
    }

    async getAllRooms() {
        return await prisma.room.findMany();
    }

    async getRoomById(id: string) {
        return await prisma.room.findUnique({ where: { id } });
    }

    async updateRoom(id: string, data: any) {
        return await prisma.room.update({ where: { id }, data });
    }

    async deleteRoom(id: string) {
        return await prisma.room.delete({ where: { id } });
    }
}
