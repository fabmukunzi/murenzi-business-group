import { Router } from 'express';
import { createTransaction, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction, webhook, withdraw } from '../controllers/transaction.controller';
import { protectRoute } from '../middlewares/auth.middleware';

const transactionRouter = Router();

transactionRouter.get('', getAllTransactions);
transactionRouter.get('/:id', getTransactionById);
transactionRouter.post('', createTransaction);
transactionRouter.put('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);
transactionRouter.post('/payment-webhook', webhook);
transactionRouter.post('/withdraw', protectRoute,withdraw);

export default transactionRouter;
