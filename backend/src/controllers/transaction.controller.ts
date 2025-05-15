import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { TransactionWebhookPayload } from '../types/transaction';

export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await TransactionService.gellAllTransactions();
        res.status(200).json({ success: true, transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const getTransactionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const transaction = await TransactionService.getTransactionById(id);

        if (!transaction) {
            res.status(404).json({ success: false, message: 'Transaction not found' });
            return
        }

        res.status(200).json({ success: true, transaction });
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const newTransaction = await TransactionService.createTransaction(req.body);
        res.status(201).json({ success: true, transaction: newTransaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await TransactionService.updateTransaction(id, req.body);
        res.status(200).json({ success: true, transaction: updated });
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await TransactionService.deleteTransaction(id);
        res.status(200).json({ success: true, message: 'Transaction deleted' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export const webhook = async (req: Request, res: Response) => {
    try {
        const payload: TransactionWebhookPayload = req.body;
        if (!payload) {
            res.status(400).json({ success: false, message: 'Missing payload' });
            return
        }
        const result = await TransactionService.handleWebhook(payload);
        res.status(200).json({ success: true, message: 'Webhook processed', result });
    } catch (error) {
        res.status(500).json({ success: false, message: `${error}` });
    }
}
