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

// NOTE: this function is written in this manner because of an error that was occuring in the deploy enviroment.
function addUser(user) {
  db('users')
    .insert(user)
    .then(ids => {
      const firstId = ids[0];
      db('users')
        .select('id', 'email', 'name', 'username', 'created_at')
        .where('id', firstId)
        .first()
        .then(user => {
          return user;
        });
      return user;
    });
  return { email: user.email, name: user.name, username: user.username };
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
