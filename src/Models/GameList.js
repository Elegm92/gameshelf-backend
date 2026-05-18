import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GameList = sequelize.define(
  "GameList",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    rawgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    status: {
      type: DataTypes.ENUM(
        "playing",
        "completed",
        "pending",
        "abandoned",
        "wishlist",
      ),
      allowNull: false,
    },
  },
  {
    indexes: [{ unique: true, fields: ["userId", "rawgId"] }],
  },
);

export default GameList;
