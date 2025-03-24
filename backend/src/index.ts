import express, { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const app: Express = express();
const prisma = new PrismaClient();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

export default app;