import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
export const checkUserExistence = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      status: 'error',
      message: 'Email is required',
    });
    return
  }

  try {
    const user = await UserService.getUserByEmail(email);

    if (!user) {
      res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
      return
    }
    req.user = user;

    next();
  } catch (error) {
    console.error('Error fetching user:', error);
     res.status(500).json({
      status: 'error',
      message: 'Server error while checking user existence',
    });
    return
  }
};
