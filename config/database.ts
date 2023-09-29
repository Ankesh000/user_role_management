// database.ts
import process from './process';
import { Sequelize } from 'sequelize';

//=================================================================================================================//

const sequelize = new Sequelize(process.DB_NAME, process.DB_USER,  process.DB_PASSWORD , {
    host:process.DB_HOST,
    dialect: 'postgres',
    port: 5000, 
    username: process.DB_USER, 
    password: process.DB_PASSWORD,
    database:process.DB_NAME,
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err:any) => {
    console.error('Unable to connect to the database:', err.message);
  });

export default sequelize;
