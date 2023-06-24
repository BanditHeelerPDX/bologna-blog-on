const faker = require("faker");
const { User, Post } = require("../models");

const seedPosts = async () => {
  const posts = [];

  try {
    const users = await User.findAll({ attributes: ["userName"] });

    for (let i = 0; i < 100; i++) {
      const title = faker.lorem.sentence(3);
      const content = faker.lorem.paragraph(1);
      const author = users[Math.floor(Math.random() * users.length)].userName;

      posts.push({
        title,
        content,
        author,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    try {
      await Post.bulkCreate(posts);
      console.log("\n----- POSTS SEEDED -----\n");
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedPosts;
