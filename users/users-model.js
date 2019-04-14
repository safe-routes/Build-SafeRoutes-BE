const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  getUserById,
  getUserByUsername,
  getUserByEmail
};

function getUserById(id) {
  return db('users')
    .select('id', 'email', 'name', 'username', 'created_at')
    .where({ id })
    .first();
}

async function addUser(user) {
  const id = await db('users').insert(user);
  const firstId = id[0];
  console.log(firstId);
  return getUserById(firstId);
}

function getUserByUsername(username) {
  return db('users')
    .select('id', 'email', 'name', 'username', 'password', 'created_at')
    .where({ username })
    .first();
}

function getUserByEmail(email) {
  return db('users')
    .select('id', 'email', 'name', 'username', 'created_at')
    .where({ email })
    .first();
}
