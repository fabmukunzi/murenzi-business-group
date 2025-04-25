// routes/intouchMockRoutes.ts
import express from 'express';
import { requestDeposit } from '../controllers/book.controller';

const bookRouter = express.Router();

bookRouter.post('/', requestDeposit);

export default bookRouter;
