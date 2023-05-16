const sequelize = require("../config/connection");
const seedUsers = require("./userSeeds");
const seedPosts = require("./postSeeds");

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");
    await seedUsers();
    console.log("\n----- USERS SEEDED -----\n");
    await seedPosts();
    console.log("\n----- POSTS SEEDED -----\n");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

seedAll();
