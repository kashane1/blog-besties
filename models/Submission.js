const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Submission extends Model {}

Submission.init(
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
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // my first thought was something like this, comments as a property of submissions, but instead im going to try comments as a new model
    // comments: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
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
    modelName: 'submission',
  }
);

module.exports = Submission;
