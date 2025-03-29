import { PrismaClient } from '@prisma/client';
import { decodeToken } from '../utils/tokenGenerator.utils';
import { User } from '../types/user.types';

const prisma = new PrismaClient();

export class UserService {
    static async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: { email },
            include: {
                role: true,
            },
        });

        return user;
    }
    static async verifyUser(token: string) {
        const decodedToken = decodeToken(token);
        const user = await UserService.getUserByEmail(decodedToken.email);
        if (!user) {
            return null;
        }
        return prisma.user.update({
            where: { email: decodedToken.email },
            data: { verified: true },
        });
    }
}


