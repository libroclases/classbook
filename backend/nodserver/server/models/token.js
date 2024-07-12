"use strict";
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    "Token",
    {

      secret: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },
      authIsSet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },

    },

    {
      sequelize,
      freezeTableName: true,
      modelName: "Token",
      tableName: "Token",
    }
  );

  Token.associate = function (models) {
    // associations can be defined here


  };
  return Token;
};