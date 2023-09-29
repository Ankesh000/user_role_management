import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database'; 
import ROLES from '../../utils/constant'

export class Admin extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public authToken!:string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

  Admin.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: ROLES.ADMIN,
      },
      authToken: {
        type: DataTypes.STRING,
        get() {
          return undefined; 
        },
      },
    },
    {
      sequelize,
      modelName: 'Admin',
      tableName: 'admins',
      timestamps: true,
    }
  );

  export default Admin;
