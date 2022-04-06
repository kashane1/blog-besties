const User = require('./User');
const Submission = require('./Submission');
const Comment = require('./Comment');

User.hasMany(Submission, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Submission.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Submission.hasMany(Comment, {
  foreignKey: 'submission_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Submission, {
  foreignKey: 'submission_id'
});

module.exports = { User, Submission, Comment };
