import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const protectRoute = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let token;
        if (!req.headers.authorization) {
            res.status(401).json({ message: "Authorization header missing" });
            return
        }
        token = req.headers.authorization.split(" ")[1];
        const jwt_secret: string | undefined = process.env.JWT_SECRET;
        if (!jwt_secret) {
            res.status(401).json({ message: "JWT_SECRET is missing" });
            return
        }
        jwt.verify(token, jwt_secret, async (err, user) => {
            if (err) {
                res
                    .status(401)
                    .json({ message: "Unauthorized request, Try again" });
                return
            } else {
                req.user = user;
                next();
            }
        });
    } catch (err:any) {
        res.status(500).json({ message:err.message|| "Internal Server Error" });
    }
};

export const restrictTo = (...roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "You are not authorized to perform this action",
            });
        }
        next();
    };
};