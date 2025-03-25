import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { RoleService } from '../services/role.service';
import { comparePassword, hashPassword } from '../utils/password.util';
import { generateToken } from '../utils/tokenGenerator.utils';
import { sendEmail } from '../utils/email.util';
import { signupEmail } from '../utils/emailTemplate/signup';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ status: 'fail', message: 'Email and password are required' });
            return;
        }
        const user = await UserService.getUserByEmail(email);
        console.log(user);
        

        if (!user) {
            res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
            return;
        }

        const role = await RoleService.getRoleById(user.roleId);
        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
            return;
        }

        if (!user.verified) {
            const token = await generateToken(user, '1h');
            const verificationLink = `${process.env.FRONTEND_URL}api/auth/verify?token=${token}`;
            await sendEmail(user.email, 'Email Verification', `Verify your email: ${verificationLink}`, `<p>Verify your email: <a href="${verificationLink}">Verify</a></p>`);
            res.status(403).json({
                status: 'fail',
                message: 'User not verified. Check your email for verification link.',
            });
            return;
        }

        const token = await generateToken(user);
        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: { token, role: role?.name, user: userWithoutPassword },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ status: 'fail', message: 'An error occurred during login' });
    }
};
export const signup = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    try {
        const role = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                roleId: `${role?.id}`,
                phoneNumber,
            },
        });
        const { password: _, ...userWithoutPassword } = newUser;
        signupEmail(email);
        res.status(201).json({
            status: 'success',
            message: `User created successfully`,
            data: {
                user: userWithoutPassword,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            message: 'Error creating user',
        });
    }
};


export const verifyUser =async (req: Request, res: Response) => {
    const token = req.query.token as string;
    if (!token) {
        res.status(400).json({
            status: 'fail',
            message: 'Token is required',
        });
        return;
    }
    try {
        const user = await UserService.verifyUser(token);
        if (!user) {
            res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            message: 'User verified successfully',
            data: {
                user,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'fail',
            message: 'Error verifying user',
        });
    }

}