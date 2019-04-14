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

function addUser(user) {
  console.log('USER BEFORE INSERT:', user);
  db('users')
    .insert(user)
    .then(ids => {
      const firstId = ids[0];
      console.log('USER ID AFTER INSERT:', firstId);
      db('users')
        .select()
        .where('id', firstId)
        .first()
        .then(user => {
          return user;
        });
      return user;
    });
  return user;
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
