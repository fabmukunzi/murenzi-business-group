import multer from "multer";

const fileFilter = (req: any, file: any, cb: any) => cb(null, true);

const storage = multer.memoryStorage();

const multerupload = multer({ storage, fileFilter });

export default multerupload;
