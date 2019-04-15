const faker = require('faker');

function generateFakeAddresses(amount) {
  const addressesArray = [];

  for (let i = 0; i < amount; i++) {
    addressesArray.push({
      user_id: 4,
      address: faker.address.streetAddress()
    });
  }
  return addressesArray;
}

exports.seed = function(knex) {
  return knex('addresses').insert(generateFakeAddresses(10));
};
