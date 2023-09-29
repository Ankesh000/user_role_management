import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { create,login } from '../services/userServices';


//========================================create user ===========================================================//


export const createUser = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;
     
        const result = await create(userName, email, password);
        if (result.status === StatusCodes.CREATED) {
        
            return res.status(result.status).json({
                status: result.status,
                data: result.data,
                message: result.message
              
            });

        } else {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Failed to create user',
            });
        }
    } catch (error: any) {
        console.error('Error creating user:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        });
    }
};


//===============================================LOGIN USER==========================================================//

export const userLogin = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { user, token } = await login(email, password);
  
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          status: StatusCodes.UNAUTHORIZED,
          message: 'Invalid credentials',
        });
      }
  
      return res.status(StatusCodes.ACCEPTED).json({
        status: StatusCodes.ACCEPTED,
        data: user,
        token,
      });

    } catch (error:any) {

      console.error('Error logging in:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message,
      });

    }
  };


//===========================================================================================================//





