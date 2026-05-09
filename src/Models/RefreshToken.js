import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const RefreshToken = sequelize.define("RefreshToken", {
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  isValid: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },

  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

export default RefreshToken;