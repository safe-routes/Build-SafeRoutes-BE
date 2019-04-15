const db = require('../data/dbConfig.js');

module.exports = {
  addAddressByUserId
};

async function findAddressById(user_id) {
  const address = db('addresses')
    .select('address', 'user_id')
    .where({ id: user_id })
    .first();
  console.log(address);
  return address;
}

async function addAddressByUserId(user_id, address) {
  console.log(user_id, address);
  const [address_id] = await db('addresses').insert({ user_id, address });

  console.log(address_id);
  return findAddressById(address_id);
}
