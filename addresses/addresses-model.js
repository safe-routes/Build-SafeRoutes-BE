const db = require('../data/dbConfig.js');

module.exports = {
  addAddressByUserId,
  findAddressById,
  getAddressesByUserId,
  deleteAddressById
};

// async function findAddressById(id) {
//   const addedAddress = await db('addresses')
//     .select('user_id', 'id', 'address', 'created_at')
//     .where({ id })
//     .first();

//   return addedAddress;
// }

function findAddressById(id) {
  return db('addresses')
    .select('user_id', 'id', 'address', 'created_at')
    .where({ id })
    .first();
}

async function addAddressByUserId(user_id, address) {
  const { rowCount } = await db('addresses').insert({ user_id, address });
  return findAddressById(rowCount);
}

// function addAddressByUserId(user_id, address) {
//   return db('addresses').insert({ user_id, address });
// }

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
