import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';
import { TransactionWebhookPayload } from '../types/transaction';
import { generateRequestTransactionId } from '../utils/requestTransactionId';
import { responseMessages } from '../utils/response.message.util';
import { get } from 'http';
import { UserService } from '../services/user.service';

export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await TransactionService.gellAllTransactions();
        res.status(200).json({ success: true, transactions });
    } catch (error:any) {
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
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
    } catch (error:any) {
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
}

export const createTransaction = async (req: Request, res: Response) => {
    try {
        const newTransaction = await TransactionService.createTransaction(req.body);
        res.status(201).json({ success: true, transaction: newTransaction });
    } catch (error:any) {
        res.status(500).json({ success: false, message: error.message||'Internal server error' });
    }
}

export const updateTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updated = await TransactionService.updateTransaction(id, req.body);
        res.status(200).json({ success: true, transaction: updated });
    } catch (error:any) {
        res.status(500).json({ success: false, message: error.message||'Internal server error' });
    }
}

export const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await TransactionService.deleteTransaction(id);
        res.status(200).json({ success: true, message: 'Transaction deleted' });
    } catch (error:any) {
        res.status(500).json({ success: false, message: error.message|| 'Internal server error' });
    }
}

export const webhook = async (req: Request, res: Response) => {
    try {
        const payload: TransactionWebhookPayload = req.body.jsonpayload;
        console.log("webhook payload", payload);
        if (!payload) {
            res.status(400).json({ success: false, message: 'Missing payload' });
            return
        }
        const result = await TransactionService.handleWebhook(payload);
        res.status(200).json({ success: true, message: 'Webhook processed', result });
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.status(500).json({ success: false, message: `${error}` });
    }
}

export const withdraw = async (req: Request, res: Response) => {
    const { phoneNumber, totalPrice, reason } = req.body;
    try {
        if (!phoneNumber || !totalPrice) {
             res.status(400).json({
                status: "error",
                message: "Missing phoneNumber or totalPrice in request body.",
            });
            return
        }
        const requesttransactionid= generateRequestTransactionId();

        const payload = {
            username: process.env.INTOUCHPAY_USERNAME,
            timestamp: "20161231115242",
            password: process.env.INTOUCHPAY_PASSWORD,
            mobilephone: phoneNumber,
            amount: totalPrice,
            // withdrawcharge: 1,
            reason: reason || "User withdrawal request",
            // sid: 1,
            requesttransactionid,
            callbackurl: process.env.CALLBACK_URL,
        };

        const response = await fetch(`${process.env.INTOUCH_BASE_URL}/requestdeposit/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const paymentResponse = await response.json();
        const responseCode = String(paymentResponse.responsecode || "401");
        const message = responseMessages[responseCode] || paymentResponse.message || paymentResponse.statusdesc || paymentResponse.detail || "Unknown error";

        if (responseCode !== "2001") {
             res.status(400).json({
                status: "error",
                message,
                responsecode: responseCode,
                success: false,
            });
            return
        }
        

        const transaction = await TransactionService.createTransaction({
            amount: parseFloat(totalPrice),
            name: req.user?.firstName + " " + req.user?.lastName,
            email: req.user?.email,
            phoneNumber: `${phoneNumber}`,
            transactionid: paymentResponse.transactionid,
            requesttransactionid: `${requesttransactionid}`,
            status: paymentResponse.status,
            reason: payload.reason,
            type:"Outgoing"
        });

         res.status(200).json({
            status: "success",
            message,
            responsecode: responseCode,
            transaction,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `${error}` });
    }
}
