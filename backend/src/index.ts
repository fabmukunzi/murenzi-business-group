import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import authRoutes from './routes/auth.routes';
import roomRouter from './routes/room.routes';
import muneItemRouter from './routes/menu.routes';
import bookRouter from './routes/book.routes';

const app: Express = express();
const prisma = new PrismaClient();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/api/auth', authRoutes);
app.use('/api', roomRouter);
app.use('/api/menu', muneItemRouter);
app.use('/api/requestdeposit',bookRouter);
app.post("/api/pay", async (req, res) => {
  const response = await fetch("https://www.intouchpay.co.rw/api/requestpayment/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req.body),
  });

  const data = await response.json();
  res.json(data);
});

export default app;