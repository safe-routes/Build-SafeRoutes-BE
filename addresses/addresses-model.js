const db = require('../data/dbConfig.js');

module.exports = {
  addAddressByUserId,
  getAddressesByUserId,
  deleteAddressById
};

async function addAddressByUserId(user_id, address) {
  const rowCount = await db('addresses').insert({ user_id, address });
  return rowCount;
}

function getAddressesByUserId(user_id) {
  return db('addresses')
    .select(`id`, `address`)
    .where({ user_id });
}

async function deleteAddressById(address_id) {
  const count = await db('addresses')
    .where({ id: address_id })
    .del();

  return count;
}
