import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/adminModel';
import User from '../models/userModel';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../../config/jwt'

//==============================================CREATE ADMIN========================================================//

export const registerAdmin = async (req: Request, res: Response) => {
    try {

        const { userName, email, password } = req.body;
 
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            userName,
            email,
            password: hashedPassword,
        });

        return res.status(StatusCodes.CREATED).json({ status: StatusCodes.CREATED, data: admin, message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering admin' });
    }
};

//===============================================LOGIN USER==========================================================//


export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const admin = await Admin.findOne({
            where: { email },
            attributes: {
                exclude: ['authToken'],
            },
        })

        if (!admin) {
            return res.status(StatusCodes.NOT_FOUND).json({
                status: StatusCodes.NOT_FOUND,
                message: 'Admin not found',
            });
        }

        const token = generateToken(admin.id, admin.email ,admin.role);
     
        if (!token) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: StatusCodes.INTERNAL_SERVER_ERROR,
                message: 'Token generation failed',
            });
        }

        admin.authToken = token;
        await admin.save();

        return res.status(StatusCodes.OK).json({
            status: StatusCodes.OK,
            data:admin,
            token,
            message: 'Admin logged in successfully'
        });
         
          
    } catch (error: any) {
        console.error('Error logging in:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
        });
    }
};

//========================================GET USERS LIST====================================================//

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        if (!users) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, message: "NO USER FOUND" })
        }
        return res.status(StatusCodes.OK).json({
            status: 'success',
            data: users,
            message: 'Users retrieved successfully',
        });
    } catch (error) {
        console.error('Error getting users:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
}

//==============================================================================================================//