interface IRole {
  id: string;
  name: string;
}

export interface IUserSchema {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string | null;
  verified: boolean;
  isActive: boolean;
  image: string | null;
  roleId: string;
  createdAt: string;
  updatedAt: string;
  role: IRole;
}

export type LoginResponse = {
  status: string;
  message: string;
  data: {
    token: string;
    role: string;
    user: IUserSchema;
  };
};
