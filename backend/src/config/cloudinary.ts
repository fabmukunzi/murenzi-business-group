import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
});

const uploadImage = async (imageData: Buffer): Promise<string> => {
    const base64Image = imageData.toString("base64");

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            `data:image/png;base64,${base64Image}`,
            { folder: "room_images" },
            (error, result) => {
                if (error || !result) {
                    reject(error || new Error("No result from Cloudinary"));
                } else {
                    resolve(result.secure_url);
                }
            }
        );
    });
};

const uploadVideo = async (videoData: Buffer): Promise<string> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "video", folder: "room_videos" },
            (error, result) => {
                if (error || !result) {
                    reject(error || new Error("No result from Cloudinary"));
                } else {
                    resolve(result.secure_url);
                }
            }
        ).end(videoData);
    });
};

export { uploadImage, uploadVideo };
