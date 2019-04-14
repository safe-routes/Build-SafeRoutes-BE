const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  getUserById,
  getUserByUsername,
  getUserByEmail
};

function getUserById(id) {
  return db('users')
    .select()
    .where('id', id)
    .first();
}

// NOTE: this fuction is written in this convoluted manner because of an error that was occuring in the deploy enviroment.
function addUser(user) {
  db('users')
    .insert(user)
    .then(ids => {
      const firstId = ids[0];

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
