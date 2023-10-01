import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/database';
import indexRoutes from './src/routes/indexRoute'
const app = express();
import  dotenv from 'dotenv'
dotenv.config()

// Set up middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', indexRoutes);
app.use(bodyParser.urlencoded({ extended: true }))
// Start the Express server
const port = process.env.PORT || 4000;
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error syncing the database:', err);
  });
  //updated commit
