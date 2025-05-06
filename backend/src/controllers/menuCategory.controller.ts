import { Request, Response } from 'express';
import { MenuCategoryService } from '../services/menuCategory.service';

const categoryService = new MenuCategoryService();

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();

        res.status(200).json({
            status: 'success',
            data: {
                categories,
            },
        });
    } catch (err: any) {
        res.status(500).json({
            status: 'error',
            message: err.message,
        });
    }
};