import { PrismaClient } from '@prisma/client';
import { decodeToken } from '../utils/tokenGenerator.utils';

const prisma = new PrismaClient();

export class UserService {
    static async getUserByEmail(email: string) {
        return prisma.user.findUnique({ where: { email } });
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


