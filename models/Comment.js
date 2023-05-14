const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      referencedColumn: "userName",
      referencedTable: "User",
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      referencedColumn: "id",
      referencedTable: "Post",
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
