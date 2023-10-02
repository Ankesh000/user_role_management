import User from '../models/userModel';
import bcrypt from 'bcrypt';
import { generateToken } from '../../config/jwt';
import { StatusCodes } from 'http-status-codes';
import { response } from 'express';
const saltRounds = 10;

//========================================CREATE USER SERVICE=========================================================//


export const create = async (userName: string, email: string, password: string) => {
    try {

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            userName,
            email,
            password: hashedPassword,
        });

       
        return {
            status: StatusCodes.CREATED,
            message: 'User created successfully',
            data: user,
            
        };

    } catch (error: any) {
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        };
    }
}

//=================================================LOGIN SERVICES==================================================//


export const login = async (email: string, password: string)=> {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return { user: null, token: null };
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { user: null, token: null };
      }
      const token = generateToken(user.id, user.email ,user.role);
      if (token) {
        user.authToken = token;
        await user.save();
      }
      return { user, token };
    } catch (error:any) {
        return {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message,
        };
    }
  };

  //===================================================================================================//
  

  export const updatedUser=async(userId: number, updatedData:any)=>{
    try {
      const user = await User.findByPk(userId);
  
      if (!user) {
        return {
          status: StatusCodes.NOT_FOUND,
          message: 'User not found',
        };
      }
  
      // Update user details
      await user.update(updatedData);
  
      return user;
    } catch (error: any) {
      return {
          status: StatusCodes.INTERNAL_SERVER_ERROR,
          message: error.message,
      };
  }
  }