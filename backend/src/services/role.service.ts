import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RoleService {
    static async getRoleById(roleId: string) {
        return prisma.role.findUnique({ where: { id: roleId } });
    }
}