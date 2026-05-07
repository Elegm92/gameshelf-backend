import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Like = sequelize.define(
  "Like",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    reviewId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
  },
  {
    indexes: [{ unique: true, fields: ["userId", "reviewId"] }],
  },
);

export default Like;
