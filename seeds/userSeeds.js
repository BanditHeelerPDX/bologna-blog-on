const faker = require("faker");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const seedUsers = async () => {
  const users = [];

  for (let i = 0; i < 25; i++) {
    const email = faker.internet.email();
    const userName = email.split("@")[0];
    const password = await bcrypt.hash("password123", 16);

    users.push({
      email,
      userName,
      password,
    });
  }

  try {
    await User.bulkCreate(users);
    console.log("\n----- USERS SEEDED -----\n");
  } catch (err) {
    console.error(err);
  }
};

module.exports = seedUsers;
