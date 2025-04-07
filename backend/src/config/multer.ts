import multer from "multer";

const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
    } else {
        cb(new Error("Only images and videos are allowed"), false);
    }
};

const storage = multer.memoryStorage();

const multerupload = multer({ storage, fileFilter });

export default multerupload;
