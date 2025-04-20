import dotenv from 'dotenv';
import { dbconnection } from './utils/db.connector';
import app from '.';

dotenv.config();
const port = process.env.PORT || 3000;

dbconnection();
app.listen(port, () => {
  console.log(`[server🚀]: Server is running at http://localhost:${port}`);
});
