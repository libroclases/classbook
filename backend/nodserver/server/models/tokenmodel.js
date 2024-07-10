"use strict";
module.exports = (sequelize, DataTypes) => {
  const TokenModel = sequelize.define(
    "TokenModel",
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
        allowNull: {
          args: false,
          msg: "Please enter your name",
        },
      },

    },

    {
      sequelize,
      freezeTableName: true,
      modelName: "TokenModel",
      tableName: "TokenModel",
    }
  );

  TokenModel.associate = function (models) {
    // associations can be defined here


  };
  return TokenModel;
};
