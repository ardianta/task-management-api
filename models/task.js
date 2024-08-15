'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Task.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    dueDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: { 
      type: DataTypes.ENUM("pending", "in progress", "completed"),
      defaultValue: "pending"
    }
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};