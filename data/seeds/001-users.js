const faker = require('faker');
const bcrypt = require('bcryptjs');

function generateFakeUsers(amount) {
  const usersArray = [];

  for (let i = 0; i < amount; i++) {
    usersArray.push({
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: bcrypt.hashSync(faker.internet.password(), 8)
    });
  }
  return usersArray;
}

exports.seed = function(knex) {
  return knex('users').insert(generateFakeUsers(100));
};
