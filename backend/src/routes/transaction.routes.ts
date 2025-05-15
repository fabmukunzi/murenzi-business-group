import { Router } from 'express';
import { createTransaction, deleteTransaction, getAllTransactions, getTransactionById, updateTransaction, webhook, withdraw } from '../controllers/transaction.controller';

const transactionRouter = Router();

transactionRouter.get('', getAllTransactions);
transactionRouter.get('/:id', getTransactionById);
transactionRouter.post('', createTransaction);
transactionRouter.put('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);
transactionRouter.post('/webhook', webhook);
transactionRouter.post('/withdraw', withdraw);

export default transactionRouter;
