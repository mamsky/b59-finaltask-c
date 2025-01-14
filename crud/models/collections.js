"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Collections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Collections.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });

      Collections.hasMany(models.Task, {
        foreignKey: "collections_id",
        as: "collections",
      });
    }
  }
  Collections.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Collections",
    }
  );
  return Collections;
};
