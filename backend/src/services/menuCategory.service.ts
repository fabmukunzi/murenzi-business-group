import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export class MenuCategoryService {
    async getAllCategories() {
        return await prisma.menuCategory.findMany();
    }
}