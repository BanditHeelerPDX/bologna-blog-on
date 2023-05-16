const faker = require('faker');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const seedUsers = async () => {
    const fakeUsers = [];

    for (let i = 0; i < 25; i++) {
        const email = faker.internet.email();
        const userName = email.split('@')[0];
        const password = await bcrypt.hash('password123', 16);

        try {
        fakeUsers.push({
            email,
            userName,
            password,
        });
    } catch (err) {
        console.error(err);
    }
        try {
            await User.bulkCreate(fakeUsers);
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = seedUsers;