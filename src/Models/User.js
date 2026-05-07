import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 20],
      isAlphanumeric: true,
    },
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
    validate: {
      len: [8, 100],
    },
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue: null,
    validate: {
      isUrl: true,
    },
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: null,
    validate: {
      len: [0, 300],
    },
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
});

export default User;
