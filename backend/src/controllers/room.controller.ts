import { Request, Response } from 'express';
import { RoomService } from '../services/room.service';
import multerupload from '../config/multer';
import { uploadImage, uploadVideo } from '../config/cloudinary';
import { bookingService } from '../services/book.service';
const roomService = new RoomService();
export const createRoom = async (req: Request, res: Response) => {
    try {
        const { name, description, pricePerNight, parkingSlots, size, location } = req.body;
        if (!name) {
            res.status(400).json({
                status: 'fail',
                message: 'Room name is required',
            });
            return
        }
        if (!description) {
            res.status(400).json({
                status: 'fail',
                message: 'Room description is required',
            });
            return
        }
        if (!pricePerNight) {
            res.status(400).json({
                status: 'fail',
                message: 'Room price is required',
            });
            return
        }
        if (!parkingSlots) {
            res.status(400).json({
                status: 'fail',
                message: 'Room parking space is required',
            });
            return
        }
        if (!size) {
            res.status(400).json({
                status: 'fail',
                message: 'Room meters is required',
            });
            return
        }
        if (!location) {
            res.status(400).json({
                status: 'fail',
                message: 'Room location is required',
            });
            return
        }

        if (name.length < 3 || name.length > 50) {
            res.status(400).json({
                status: 'fail',
                message: 'Room name must be between 3 and 50 characters',
            });
            return
        }

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

        const parsedPrice = parseFloat(pricePerNight);
        const parsedParkingSpace = parseInt(parkingSlots, 10);

        if ([parsedPrice, parsedParkingSpace].some(value => isNaN(value) || value < 0)) {
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
            parkingSpace: parsedParkingSpace,
            size,
            location,
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
        const roomWithBookings = await roomService.getRoomById(req.params.id);
        if (!roomWithBookings) {
            res.status(404).json({ status: 'fail', message: 'Room not found' });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Room retrieved successfully',
            data: {
                room: {
                    id: roomWithBookings.id,
                    name: roomWithBookings.name,
                    description: roomWithBookings.description,
                    images: roomWithBookings.images,
                    video: roomWithBookings.video,
                    available: roomWithBookings.available,
                    price: roomWithBookings.price,
                    parkingSpace: roomWithBookings.parkingSpace,
                    size: roomWithBookings.size,
                    location: roomWithBookings.location,
                    createdAt: roomWithBookings.createdAt,
                    updatedAt: roomWithBookings.updatedAt
                },
                bookings: roomWithBookings.bookings
            },
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



        if (parkingSpace !== undefined) {
            const parsedParkingSpace = parseInt(parkingSpace, 10);
            if (!isNaN(parsedParkingSpace) && parsedParkingSpace >= 0 && parsedParkingSpace !== existingRoom.parkingSpace) {
                updatedData.parkingSpace = parsedParkingSpace;
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
        const id = req.params.id;

        const room = await roomService.getRoomById(id);
        if (!room) {
            res.status(404).json({
                status: "failed",
                message: "Room not found"
            });
            return
        }
        const booking = await bookingService.getBookingByRoomId(id);
        if (booking) {
            res.status(400).json({
                status: "failed",
                message: "First delete the booking before deleting the room"
            });
            return
        }

        await roomService.deleteRoom(id);
        res.status(200).json({
            status: 'success',
            message: 'Room deleted successfully',
        });

    } catch (error: any) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteRoomImage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { imageUrl } = req.body;

        const room = await roomService.getRoomById(id);
        if (!room) {
            res.status(404).json({
                status: 'fail',
                message: 'Room not found',
            });
            return;
        }

        if (!room.images || !room.images.includes(imageUrl)) {
            res.status(400).json({
                status: 'fail',
                message: 'Image not found in the room',
            });
            return;
        }

        const updatedImages = room.images.filter((image) => image !== imageUrl);

        const updatedRoom = await roomService.updateRoom(id, { images: updatedImages });

        res.status(200).json({
            status: 'success',
            message: 'Image deleted successfully',
            data: { updatedRoom },
        });
    } catch (error: any) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};