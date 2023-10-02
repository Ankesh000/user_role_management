import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import process from './process';
import User from '../src/models/userModel'


//==============================Generate a JWT token======================================================//

export const generateToken = (userId: number, email: string ,role:string): string => {
  const token = jwt.sign(
    { userId, email ,role},
    process.JWT_SECRET,
    { expiresIn: '100h' }
  );
  return token;
};

//===============================================AUTH====================================================//

export const checkRole = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
      let token: any;
  
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        
        try {
          const decoded: any = jwt.verify(token, process.JWT_SECRET);
          const userRole = decoded.role;
          console.log("role is" , role)
          console.log("decoded " , decoded)

          if (userRole === role) {
            next();
          } else {
            return res.status(StatusCodes.UNAUTHORIZED).json({
              status: StatusCodes.UNAUTHORIZED,
              message: 'Cannot access this route',
            });
          }
        } catch (error) {
          console.error('Token verification error:', error);
          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: 'Unauthorized',
          });
        }
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: StatusCodes.UNAUTHORIZED,
          message: 'Token missing or invalid',
        });
      }
    };
  };
  
  //==========================================USER AUTH ====================================================//


  export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: any;
  
      if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
  
        const decoded: any = jwt.verify(token, process.JWT_SECRET);
        const userId = decoded.userId;
        
        const checkUser = await User.findByPk(userId);
  
        if (checkUser) {
          req.userId = userId;
          next();
        } else {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: StatusCodes.UNAUTHORIZED,
            message: 'INVALID TOKEN',
          });
        }
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: StatusCodes.UNAUTHORIZED,
          message: 'Token missing or invalid',
        });
      }
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: StatusCodes.UNAUTHORIZED,
        message: 'Unauthorized',
      });
    }
  };



