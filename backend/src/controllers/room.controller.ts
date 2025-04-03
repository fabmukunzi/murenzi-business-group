import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import multerupload from '../config/multer';
import { uploadImage, uploadVideo } from '../config/cloudinary';

const roomService = new RoomService();
export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, description, price, numberOfBeds, numberOfBaths, parkingSpace, meters } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const roomExist = await roomService.getRoomByName(name);
        if (roomExist) {
            res.status(400).json({
                status: 'fail',
                message: 'Room name already exists',
            });
            return
        }

        if (!files.images || files.images.length === 0) {
            res.status(400).json({
                status: 'fail',
                message: 'No image files provided',
            });
            return
        }

        const uploadedImageUrls = await Promise.all(
            files.images.map(async (image) => await uploadImage(image.buffer))
        );

        let uploadedVideoUrl: string | null = null;
        if (files.video && files.video.length > 0) {
            uploadedVideoUrl = await uploadVideo(files.video[0].buffer);
        }

        const parsedPrice = parseFloat(price);
        const parsedNumberOfBeds = parseInt(numberOfBeds, 10);
        const parsedNumberOfBaths = parseInt(numberOfBaths, 10);
        const parsedParkingSpace = parseInt(parkingSpace, 10);
        const parsedMeters = parseFloat(meters);

        if ([parsedPrice, parsedNumberOfBeds, parsedNumberOfBaths, parsedParkingSpace, parsedMeters].some(value => isNaN(value) || value < 0)) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid numerical values provided',
            });
            return
        }

        const room = await roomService.createRoom({
            name,
            description,
            images: uploadedImageUrls,
            video: uploadedVideoUrl,
            price: parsedPrice,
            numberOfBeds: parsedNumberOfBeds,
            numberOfBaths: parsedNumberOfBaths,
            parkingSpace: parsedParkingSpace,
            meters: parsedMeters,
        });

        res.status(201).json({
            status: 'success',
            message: 'Room created successfully',
            data: { room },
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

export const getAllRooms = async (req: Request, res: Response) => {
    try {
        const rooms = await roomService.getAllRooms();
        res.status(200).json({
            status: 'success',
            message: 'Rooms retrieved successfully',
            data: { rooms },
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const getRoomById = async (req: Request, res: Response) => {
    try {
        const room = await roomService.getRoomById(req.params.id);
        if (!room) {
            res.status(404).json({ status: 'fail', message: 'Room not found' });
            return
        }
        res.status(200).json({
            status: 'success',
            message: 'Room retrieved successfully',
            data: { room },
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateRoom = async (req: Request, res: Response) => {
    try {
        const existingRoom = await roomService.getRoomById(req.params.id);
        if (!existingRoom) {
            res.status(404).json({ status: 'fail', message: 'Room not found' });
            return
        }

        const { name, description, price, numberOfBeds, numberOfBaths, parkingSpace, meters } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        console.log(name);
        
        let updatedData: Record<string, any> = {};

        if (name && name !== existingRoom.name) updatedData.name = name;
        if (description && description !== existingRoom.description) updatedData.description = description;

        console.log(req.body);
        
        if (price !== undefined) {
            const parsedPrice = parseFloat(price);
            if (!isNaN(parsedPrice) && parsedPrice >= 0 && parsedPrice !== existingRoom.price) {
                updatedData.price = parsedPrice;
            }
        }

        if (numberOfBeds !== undefined) {
            const parsedNumberOfBeds = parseInt(numberOfBeds, 10);
            if (!isNaN(parsedNumberOfBeds) && parsedNumberOfBeds >= 0 && parsedNumberOfBeds !== existingRoom.numberOfBeds) {
                updatedData.numberOfBeds = parsedNumberOfBeds;
            }
        }

        if (numberOfBaths !== undefined) {
            const parsedNumberOfBaths = parseInt(numberOfBaths, 10);
            if (!isNaN(parsedNumberOfBaths) && parsedNumberOfBaths >= 0 && parsedNumberOfBaths !== existingRoom.numberOfBaths) {
                updatedData.numberOfBaths = parsedNumberOfBaths;
            }
        }

        if (parkingSpace !== undefined) {
            const parsedParkingSpace = parseInt(parkingSpace, 10);
            if (!isNaN(parsedParkingSpace) && parsedParkingSpace >= 0 && parsedParkingSpace !== existingRoom.parkingSpace) {
                updatedData.parkingSpace = parsedParkingSpace;
            }
        }

        if (meters !== undefined) {
            const parsedMeters = parseFloat(meters);
            if (!isNaN(parsedMeters) && parsedMeters >= 0 && parsedMeters !== existingRoom.meters) {
                updatedData.meters = parsedMeters;
            }
        }
        let newImages = Array.isArray(existingRoom.images) ? [...existingRoom.images] : [];

        if (files?.images && files.images.length > 0) {
            const uploadedImageUrls = await Promise.all(
                files.images.map(async (image) => await uploadImage(image.buffer))
            );
            newImages = [...newImages, ...uploadedImageUrls];
            updatedData.images = newImages;
        }
        if (files?.video && files.video.length > 0) {
            updatedData.video = await uploadVideo(files.video[0].buffer);
        }

        console.log(name);

        const updatedRoom = await roomService.updateRoom(req.params.id, updatedData);

        res.status(200).json({
            status: 'success',
            message: 'Room updated successfully',
            data: { updatedRoom },
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};



export const deleteRoom = async (req: Request, res: Response) => {
    try {
        await roomService.deleteRoom(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Room deleted successfully',
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
import { JsonArray } from '@prisma/client/runtime/library';

export const deleteRoomImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body; 
        if (!imageUrl) {
             res.status(400).json({ status: 'fail', message: 'Image URL is required' });
            return
        }
        const room = await roomService.getRoomById(id);
        if (!room) {
             res.status(404).json({ status: 'fail', message: 'Room not found' });
            return
        }
        const imagesArray: string[] = (room.images as JsonArray)?.map(String) || [];

        if (!imagesArray.includes(imageUrl)) {
             res.status(400).json({ status: 'fail', message: 'Image not found in room' });
            return
        }
        const updatedImages = imagesArray.filter((img) => img !== imageUrl);
        await roomService.updateRoom(id, { images: updatedImages });

        res.status(200).json({
            status: 'success',
            message: 'Image deleted successfully',
            data: { images: updatedImages },
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};



export const deleteRoomVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const room = await roomService.getRoomById(id);
        if (!room) {
             res.status(404).json({ status: 'fail', message: 'Room not found' });
             return
        }

        if (!room.video) {
             res.status(400).json({ status: 'fail', message: 'No video found in room' });
             return
        }
        await roomService.updateRoom(id, { video: null });

        res.status(200).json({
            status: 'success',
            message: 'Video deleted successfully'
        });
    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
