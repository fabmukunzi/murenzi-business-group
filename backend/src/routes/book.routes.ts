import { Router } from 'express';
import {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
} from '../controllers/book.controller';

const bookRouter = Router();

bookRouter.post('/', createBooking);
bookRouter.get('/', getAllBookings);
bookRouter.get('/:id', getBookingById);
bookRouter.put('/:id', updateBooking);
bookRouter.delete('/:id', deleteBooking);

export default bookRouter;