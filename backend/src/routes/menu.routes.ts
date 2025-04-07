import { Router } from 'express';
import {
    createItem, getAllItems, getItemById,
    updateItem, deleteItem
} from '../controllers/menuItem.controller';
import multerupload from '../config/multer';

const muneItemRouter = Router();

muneItemRouter.post('/', multerupload.fields([{ name: 'image', maxCount: 1 }]), createItem);
muneItemRouter.get('/', getAllItems);
muneItemRouter.get('/:id', getItemById);
muneItemRouter.put('/:id', multerupload.fields([{ name: 'image', maxCount: 1 }]), updateItem);
muneItemRouter.delete('/:id', deleteItem);

export default muneItemRouter;
