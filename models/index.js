const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// A User can have many posts
User.hasMany(Post, {
    foreignKey: "author",
  });
  
  // A User can have many comments
  User.hasMany(Comment, {
    foreignKey: "author",
  });
  
  // A Post belongs to a User
  Post.belongsTo(User, {
    foreignKey: "author",
  });
  
  // A Comment belongs to a User
  Comment.belongsTo(User, {
    foreignKey: "author",
  });
  
  // A Comment belongs to a Post
  Comment.belongsTo(Post, {
    foreignKey: "post_id",
  });
  
  // A Post can have many comments
  Post.hasMany(Comment, {
    foreignKey: "post_id",
  });

module.exports = { User, Post, Comment };