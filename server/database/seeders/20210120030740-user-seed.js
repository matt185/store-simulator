'use strict';
require('dotenv').config()
const {
  v4: uuidV4
} = require('uuid')
const bcrypt = require('bcrypt')
const userPassword = process.env.USER_PASSWORD

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      userId: uuidV4(),
      username: process.env.USERNAME,
      email: process.env.USER_EMAIL,
      password: await bcrypt.hash(userPassword, 10),
      role: "master",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};