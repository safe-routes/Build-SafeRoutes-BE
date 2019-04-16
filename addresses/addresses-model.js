const db = require('../data/dbConfig.js');

module.exports = {
  addAddressByUserId,
  findAddressById,
  getAddressesByUserId,
  deleteAddressById,
  getAddressByEmail
};

function getAddressByEmail(email) {
  return db('addresses')
    .join('')
    .select('id', 'email', 'name', 'created_at')
    .where({ email })
    .first();
}

function findAddressById(id) {
  return db('addresses')
    .select('user_id', 'id', 'address', 'created_at')
    .where({ id })
    .first();
}

async function addAddressByUserId(user_id, address) {
  const { rowCount } = await db('addresses').insert({ user_id, address });
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
