import { Router } from 'express';
import { createRoom, getAllRooms, getRoomById, updateRoom, deleteRoom, deleteRoomImage, deleteRoomVideo } from '../controllers/room.controller';
import multerupload from '../config/multer';

const roomRouter = Router();

roomRouter.post('/rooms', multerupload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 }
]), createRoom);
roomRouter.get('/rooms', getAllRooms);
roomRouter.get('/rooms/:id', getRoomById);
roomRouter.patch('/rooms/:id', multerupload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 }
]), updateRoom);
roomRouter.delete('/rooms/:id/image', deleteRoomImage);
roomRouter.delete('/rooms/:id/video', deleteRoomVideo);


export default roomRouter;
