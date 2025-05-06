import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class MenuItemService {
    async create(data: any) {
        return await prisma.menuItem.create({ data });
    }

    async getAll() {
        return await prisma.menuItem.findMany({ include: { category: true } });
    }

    async getById(id: string) {
        return await prisma.menuItem.findUnique({ where: { id }, include: { category: true } });
    }

    async update(id: string, data: any) {
        return await prisma.menuItem.update({ where: { id }, data });
    }
    async getByCategoryId(categoryId: string) {
        return await prisma.menuItem.findMany({
            where: { categoryId },
            include: { category: true },
        });
    }

    async delete(id: string) {
        return await prisma.menuItem.delete({ where: { id } });
    }
}
