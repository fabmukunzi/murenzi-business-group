import { Router } from 'express';
import { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom } from '../controllers/room.controller';
import multerupload from '../config/multer';

const roomRouter = Router();

roomRouter.post('/rooms', multerupload.array("images", 5), createRoom);
roomRouter.get('/rooms', getAllRooms);
roomRouter.get('/rooms/:id', getRoomById);
roomRouter.put('/rooms/:id', updateRoom);
roomRouter.delete('/rooms/:id', deleteRoom);

export default roomRouter;
