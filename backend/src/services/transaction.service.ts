import { PrismaClient } from '@prisma/client';
import { TransactionWebhookPayload } from '../types/transaction';
import { pusher } from '../config/pusher';

const prisma = new PrismaClient();

export class TransactionService {
    static async getTransactionById(id: string|undefined) {
        return prisma.transaction.findUnique({ where: { id } });
    }
    static async gellAllTransactions() {
        return prisma.transaction.findMany({
            orderBy: {
                createdAt: 'desc',
            }, include: { booking: { include: { room: true } } } });
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

    static async handleWebhook(payload: TransactionWebhookPayload) {
        const {
            requesttransactionid,
            transactionid,
            status,
        } = payload;

        console.log("Webhook payload:", payload);
        

        if (!transactionid || !requesttransactionid) {
            throw new Error("Missing transactionid or requesttransactionid");
        }

        const normalizedStatus = status.toLowerCase() === "successfull" ? "success" : "failed";
        console.log("Normalized status:", normalizedStatus);
        

        const updatedTransaction = await prisma.transaction.updateMany({
            where: {
                transactionid,
                requesttransactionid,
            },
            data: {
                status: normalizedStatus,
                updatedAt: new Date(),
            },
        });

        if (updatedTransaction.count === 0) {
            throw new Error("Transaction not found");
        }

        await pusher.trigger("transactions", "status-updated", {
            transactionid,
            requesttransactionid,
            status: normalizedStatus,
        });

        return updatedTransaction;
      }

}