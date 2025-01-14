"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.Collections, {
        foreignKey: "collections_id",
        as: "collections",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Task.init(
    {
      name: DataTypes.STRING,
      is_done: DataTypes.STRING,
      collections_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
