// models/User.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../../config/database'; 
import ROLES from '../../utils/constant'
class User extends Model {
  public id!: number;
  public userName!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public authToken!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: ROLES.USER,
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
    modelName: 'User',
    tableName: 'users', 
    timestamps: true,
  }
);

export default User;
