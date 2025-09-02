import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Item = sequelize.define(
  "Item",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name is required" },
        len: { args: [2, 120], msg: "Name must be 2-120 characters long" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "Price must be a decimal number" },
        min: { args: [0], msg: "Price must be greater than 0" },
      },
    },
  },
  {
    tableName: "items",
    timestamps: true,
  }
);
