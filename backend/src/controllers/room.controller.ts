import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import multerupload from '../config/multer';
import { uploadImage, uploadVideo } from '../config/cloudinary';

const roomService = new RoomService();
export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, description, price, sizeOfBeds, sizeOfBaths, parkingSpace, meters } = req.body;
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
        const parsedSizeOfBeds = parseInt(sizeOfBeds, 10);
        const parsedSizeOfBaths = parseInt(sizeOfBaths, 10);
        const parsedParkingSpace = parseInt(parkingSpace, 10);
        const parsedMeters = parseFloat(meters);

        if ([parsedPrice, parsedSizeOfBeds, parsedSizeOfBaths, parsedParkingSpace, parsedMeters].some(value => isNaN(value) || value < 0)) {
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
            sizeOfBeds: parsedSizeOfBeds,
            sizeOfBaths: parsedSizeOfBaths,
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

        const { name, description, price, sizeOfBeds, sizeOfBaths, parkingSpace, meters } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        let updatedData: Record<string, any> = {};

        if (name && name !== existingRoom.name) updatedData.name = name;
        if (description && description !== existingRoom.description) updatedData.description = description;
        
        if (price !== undefined) {
            const parsedPrice = parseFloat(price);
            if (!isNaN(parsedPrice) && parsedPrice >= 0 && parsedPrice !== existingRoom.price) {
                updatedData.price = parsedPrice;
            }
        }

        if (sizeOfBeds !== undefined) {
            const parsedSizeOfBeds = parseInt(sizeOfBeds, 10);
            if (!isNaN(parsedSizeOfBeds) && parsedSizeOfBeds >= 0 && parsedSizeOfBeds !== existingRoom.sizeOfBeds) {
                updatedData.sizeOfBeds = parsedSizeOfBeds;
            }
        }

        if (sizeOfBaths !== undefined) {
            const parsedSizeOfBaths = parseInt(sizeOfBaths, 10);
            if (!isNaN(parsedSizeOfBaths) && parsedSizeOfBaths >= 0 && parsedSizeOfBaths !== existingRoom.sizeOfBaths) {
                updatedData.sizeOfBaths = parsedSizeOfBaths;
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