import { Request, Response, NextFunction } from 'express';
import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4  , validate} from 'uuid';



const GetUser = async (req: Request<{ userId: string , email: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
  
      // Validate UUID format
      if (!validate(userId)) {
        return res.status(404).json({ message: 'Invalid ID' });
      }
  
      // Fetch user by UUID
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      next(new Error('something went wrong'));
    }
};
  

export {
  GetUser,
};
