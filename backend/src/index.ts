import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import authRoutes from './routes/auth.routes';
import roomRouter from './routes/room.routes';
import muneItemRouter from './routes/menu.routes';

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

export default app;