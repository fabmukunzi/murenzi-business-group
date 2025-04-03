import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import uploadImage from '../config/cloudinary';
import multerupload from '../config/multer';
import { Room } from '../types/room.types';
const roomService = new RoomService();
export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, description, price, numberOfBeds, numberOfBaths, parkingSpace, meters } = req.body;
        const images = req.files as Express.Multer.File[];

        console.log("Uploaded files:", images);

        if (!images || images.length === 0) {
             res.status(400).json({ error: 'No image files provided' });
            return
        }

        // Upload multiple images and store their URLs in an array
        const uploadedImageUrls = await Promise.all(
            images.map(async (image) => {
                return await uploadImage(image.buffer);
            })
        );

        console.log("Uploaded Image URLs:", uploadedImageUrls);

        if (!name || name.length < 3) {
             res.status(400).json({ error: 'Name must be at least 3 characters long' });
            return
        }

        // Convert string values to numbers
        const parsedPrice = parseFloat(price);
        const parsedNumberOfBeds = parseInt(numberOfBeds, 10);
        const parsedNumberOfBaths = parseInt(numberOfBaths, 10);
        const parsedParkingSpace = parseInt(parkingSpace, 10);
        const parsedMeters = parseFloat(meters);

        if (isNaN(parsedPrice) || parsedPrice < 0) {
             res.status(400).json({ error: 'Price must be a valid positive number' });
             return
        }

        if (isNaN(parsedNumberOfBeds) || parsedNumberOfBeds < 0) {
             res.status(400).json({ error: 'Number of beds must be a valid positive number' });
        }

        if (isNaN(parsedNumberOfBaths) || parsedNumberOfBaths < 0) {
             res.status(400).json({ error: 'Number of baths must be a valid positive number' });
             return
        }

        if (isNaN(parsedParkingSpace) || parsedParkingSpace < 0) {
             res.status(400).json({ error: 'Parking space must be a valid positive number' });
             return
        }

        if (isNaN(parsedMeters) || parsedMeters < 0) {
             res.status(400).json({ error: 'Meters must be a valid positive number' });
             return
        }

        const room = await roomService.createRoom({
            name,
            description,
            images: uploadedImageUrls, 
            price: parsedPrice,
            numberOfBeds: parsedNumberOfBeds,
            numberOfBaths: parsedNumberOfBaths,
            parkingSpace: parsedParkingSpace,
            meters: parsedMeters,
        });

         res.status(201).json(room);
         return
    } catch (error: any) {
         res.status(500).json({ error: error.message });
         return
    }
};


export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.json(rooms);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        if (!room) {
            res.status(404).json({ error: 'Room not found' });
            return;
        }
        res.json(room);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const existingRoom = await roomService.getRoomById(req.params.id);
        if (!existingRoom) {
            res.status(404).json({ error: 'Room not found' });
            return;
        }
        const { name, description, images, price, numberOfBeds, numberOfBaths, parkingSpace, meters } = req.body;
        let newImages: string[] = [];

        if (Array.isArray(existingRoom.images)) {
            newImages = existingRoom.images.filter(item => typeof item === 'string') as string[];
        }
        if (Array.isArray(images)) {
            newImages = [...newImages, ...images];
        }

        if (price < 0) {
            res.status(400).json({ error: 'Price must be a positive number' });
            return;
        }

        const updatedRoom = await roomService.updateRoom(req.params.id, {
            name,
            description,
            images: newImages,
            price,
            numberOfBeds,
            numberOfBaths,
            parkingSpace,
            meters,
        });
        res.json(updatedRoom);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};



export const deleteRoom = async (req: Request, res: Response) => {
    try {
        await roomService.deleteRoom(req.params.id);
        res.json({ message: 'Room deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
