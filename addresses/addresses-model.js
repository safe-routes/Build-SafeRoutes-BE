const db = require('../data/dbConfig.js');

module.exports = {
  addAddressByUserId,
  findAddressById
};

async function findAddressById(id) {
  const addedAddress = await db('addresses')
    .select('id', 'user_id', 'address', 'created_at')
    .where({ id })
    .first();

  return addedAddress;
}

async function addAddressByUserId(user_id, address) {
  const [address_id] = await db('addresses').insert({ user_id, address });
  return findAddressById(address_id);
}
