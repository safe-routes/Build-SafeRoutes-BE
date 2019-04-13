const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  getUserById,
  getAll
};

async function addUser(user) {
  const [id] = await db('users').insert(user);
  return getUserById(id);
}

function getUserById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id })
    .first();
}

function getAll() {
  //for testing production only
  return db('users');
}
