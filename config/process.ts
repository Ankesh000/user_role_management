"use strict";
import  dotenv from 'dotenv'
dotenv.config()
export default {
    DB_NAME: process.env.DB_NAME ?? '',
    JWT_SECRET: process.env.JWT_SECRET ?? '',
    DB_HOST: process.env.DB_HOST ?? '',
    DB_USER: process.env.DB_USER ?? '',
    DB_PASSWORD: process.env.DB_PASSWORD ?? '',
    PORT: process.env.PORT ?? '',
    DB_PORT:process.env.DB_PORT,
}
