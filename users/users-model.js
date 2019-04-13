const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  getUserById,
  getAll
};

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function addUser(user) {
  const id = await db('users').insert(user);
  const firstId = id[0];
  const addedUser = await db('users')
    .where({ id: firstId })
    .first();
  console.log(addedUser);
  return addedUser;
}

function getAll() {
  //for testing production only
  return db('users');
}
