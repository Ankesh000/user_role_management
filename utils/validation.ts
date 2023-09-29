
import { StatusCodes } from 'http-status-codes';
import Joi from 'joi';
import User from '../src/models/userModel';
import Admin from './../src/models/adminModel';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt'

//==========================================CREATE USER VALIDATIONS===============================================//

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ status: 400, message: error.details[0].message });
  }

  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    return res.status(StatusCodes.CONFLICT).json({ status: StatusCodes.CONFLICT, message: 'Email is already in use' });
  }

  next();
};


//====================================USER LOGIN VALIDATION======================================================//


export const validateUserLogin = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: 400, mssage: error.details[0].message });
  }
  const existingUser = await User.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    next();
  } else {
    return res.status(StatusCodes.NOT_FOUND).json({ status: StatusCodes.NOT_FOUND, message: `NO USER FOUND WITH ${req.body.email}` });
  }

};


//==========================================CREATE ADMIN VALIDATIONS===============================================//

export const validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ status: StatusCodes.BAD_REQUEST, message: error.details[0].message });
  }

  const existingUser = await Admin.findOne({ where: { email: req.body.email } });
  if (existingUser) {
    return res.status(StatusCodes.CONFLICT).json({ status: StatusCodes.CONFLICT, message: 'Email is already in use' });
  }

  next();
};


//====================================ADMIN LOGIN VALIDATION======================================================//

export const validateAdminLogin = async (req: Request,res: Response,next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: StatusCodes.BAD_REQUEST,
      message: error.details[0].message,
    });
  }

  const existingAdmin = await Admin.findOne({
    where: { email: req.body.email },
  });

  if (!existingAdmin) {
    return res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      message: `No admin found with email: ${req.body.email}`,
    });
  }
  const passwordMatch = await bcrypt.compare(req.body.password, existingAdmin.password);

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: StatusCodes.UNAUTHORIZED,
      message: 'Incorrect password',
    });
  }
  
  next();
};


//==================================================================================================================//


