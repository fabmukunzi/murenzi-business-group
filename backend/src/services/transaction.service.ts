import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class TransactionService {
    static async getTransactionById(id: string|undefined) {
        return prisma.transaction.findUnique({ where: { id } });
    }
    static async gellAllTransactions() {
        return prisma.transaction.findMany({include: { booking: true}});
    }
    static async createTransaction(data: any) {
        return prisma.transaction.create({ data });
    }
    static async updateTransaction(id: string, data: any) {
        return prisma.transaction.update({ where: { id }, data });
    }
    static async updateTransactionStatus(id: string, status: string) {
        return prisma.transaction.update({ where: { id }, data: { status } });
    }
    static async deleteTransaction(id: string) {
        return prisma.transaction.delete({ where: { id } });
    }
}