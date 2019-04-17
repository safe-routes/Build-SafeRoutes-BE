const db = require('../data/dbConfig.js');

module.exports = {
  addGroup,
  getGroupByName,
  addUserToGroup
};

async function addGroup(group) {
  const { rowCount } = await db('users').insert(user);
  return rowCount;
}

function getGroupByName() {}

function addUserToGroup() {}
