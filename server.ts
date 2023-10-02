import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database';
import indexRoutes from './src/routes/indexRoute';
import dotenv from 'dotenv';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.start();
  }

  private config(): void {
    dotenv.config();
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.use('/api/v1', indexRoutes);
  }

  private start(): void {
    const port = process.env.PORT || 4000;
    sequelize
      .sync()
      .then(() => {
        this.app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      })
      .catch((err) => {
        console.error('Error syncing the database:', err);
      });
  }
}

new Server();
