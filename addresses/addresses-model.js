const db = require('../data/dbConfig.js');

module.exports = {
  addAddressByUserId,
  findAddressById,
  getAddressesByUserId,
  deleteAddressById
};

async function findAddressById(id) {
  const addedAddress = await db('addresses')
    .select('user_id', 'id', 'address', 'created_at')
    .where({ id })
    .first();
  console.log(addedAddress);

  return addedAddress;
}

function addAddressByUserId(user_id, address) {
  return db('addresses')
    .insert({ user_id, address })
    .then(id =>
      db('addresses')
        .select('user_id', 'id', 'address', 'created_at')
        .where({ id })
        .first()
    );
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
