const sequelize = require('../config/connection');
const { User, Bill } = require('../models');

const userData = require('./userData.json');
const billData = require('./billData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const bill of billData) {
    await Bill.create({
      ...bill,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
