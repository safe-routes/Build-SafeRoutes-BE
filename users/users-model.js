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
  const [id] = await db('users').insert(user);
  console.log(id);
  return db('users')
    .where({ id })
    .first();
}

function getAll() {
  //for testing production only
  return db('users');
}
