const sequelize = require('../config/connection');
const { User, Submission, Comment} = require('../models');

const userData = require('./userData.json');
const submissionData = require('./submissionData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // i think i need to change this seeding of the submission data, it doesnt translate perfectly
  // 
  for (const submission of submissionData) {
    await Submission.create({
      ...submission,
    });
  }

  // trying like this for both, no math random and then i need to assign actual id in the seeddata
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  process.exit(0);
};

seedDatabase();
