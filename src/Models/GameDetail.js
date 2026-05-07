import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const GameDetail = sequelize.define(
  "GameDetail",
  {
    rawgId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    // cachedAt: {
    //   type: DataTypes.DATE,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    timestamps: false,
  },
);

export default GameDetail;
