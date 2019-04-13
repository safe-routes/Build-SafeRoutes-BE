const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  getUserById
};

function getUserById(id) {
  return db('users')
    .where({ id })
    .first();
}

async function addUser(user) {
  const [id] = await db('users').insert(user);
  return getUserById(id);
}
