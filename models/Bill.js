const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bill extends Model {}

Bill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bill_type: {
      type: DataTypes.STRING,
    },
    due_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bill_amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bill',
  }
);

module.exports = Bill;
