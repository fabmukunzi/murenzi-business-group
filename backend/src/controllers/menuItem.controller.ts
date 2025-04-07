import { Request, Response } from 'express';
import { MenuItemService } from '../services/menuItem.service';
import { uploadImage } from '../config/cloudinary';

const itemService = new MenuItemService();

export const createItem = async (req: Request, res: Response) => {
    try {
        const { name, description, price, categoryId } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!files?.image?.[0]) {
            res.status(400).json({
                status: 'fail',
                message: 'Image is required'
            });
            return
        }

        const imageUrl = await uploadImage(files.image[0].buffer);
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedPrice)) {
            res.status(400).json({
                status: 'fail',
                message: 'Invalid price'
            });
            return;
        }
        if (!name || !description || !categoryId) {
            res.status(400).json({
                status: 'fail',
                message: 'Name, description, and categoryId are required'
            });
            return;
        }

        const item = await itemService.create({
            name,
            description,
            price: parsedPrice,
            categoryId,
            image: imageUrl
        });

        res.status(201).json({
            status: 'success',
            data: {
                item
            }
        });
    } catch (err: any) {
        res.status(500).json({
            status: 'error',
            message: err.message

        });
    }
};

export const getAllItems = async (_: Request, res: Response) => {
    try {
        const items = await itemService.getAll();
        res.status(200).json({
            status: 'success',
            data: {
                items
            }
        });
    } catch (err: any) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

export const getItemById = async (req: Request, res: Response) => {
    try {
        const item = await itemService.getById(req.params.id);
        if (!item) {
            res.status(404).json({
                status: 'fail',
                message: 'Not found'
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            data: {
                item
            }
        });
    } catch (err: any) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

export const updateItem = async (req: Request, res: Response) => {
    try {
        const { price } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const updateData: any = { ...req.body };

        if (price) {
            const parsedPrice = parseFloat(price);
            if (!isNaN(parsedPrice)) updateData.price = parsedPrice;
        }

        if (files?.image?.[0]) {
            updateData.image = await uploadImage(files.image[0].buffer);
        }

        const item = await itemService.update(req.params.id, updateData);
        res.status(200).json({
            status: 'success',
            data: {
                item
            }
        });
    } catch (err: any) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

export const deleteItem = async (req: Request, res: Response) => {
    try {
        await itemService.delete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Deleted successfully'
        });
    } catch (err: any) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
