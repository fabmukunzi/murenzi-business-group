export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string | null;
    password: string;
    verified: boolean;
    isActive: boolean;
    image?: string | null;
    roleId: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface Role {
    id: string;
    name: RoleData;
    users?: User[];
}

export enum RoleData {
    ADMIN = 'ADMIN',
}
