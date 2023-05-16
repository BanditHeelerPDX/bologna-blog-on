const faker = require("faker");
const { User, Post } = require("../models");

const seedPosts = async () => {
  const fakePosts = [];

  try {
    const users = await User.findAll({ attributes: ["userName"] });

    for (let i = 0; i < 100; i++) {
      const title = faker.lorem.sentence(3);
      const content = faker.lorem.paragraph(2);
      const author = users[Math.floor(Math.random() * users.length)].userName;

      fakePosts.push({
        title,
        content,
        author,
      });
    }

    try {
      await Post.bulkCreate(fakePosts);
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedPosts;
