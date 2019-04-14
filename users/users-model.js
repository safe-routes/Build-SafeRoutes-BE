const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  getUserById,
  getUserByUsername,
  getUserByEmail
};

function getUserById(id) {
  console.log(id);
  return db('users')
    .select()
    .where('id', id)
    .first();
}

async function addUser(user) {
  console.log('USER BEFORE INSERT:', user);
  const id = await db('users').insert(user);
  const firstId = id[0];
  console.log('USER ID AFTER INSERT:', firstId);
  const addedUser = getUserById(firstId);
  console.log('ADDED USER:', addedUser);
  return addedUser;
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
