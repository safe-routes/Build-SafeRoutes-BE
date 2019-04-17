const db = require('../data/dbConfig.js');

module.exports = {
  addGroup,
  getGroupByName,
  addUserToGroup
};

async function addGroup(group) {
  const { rowCount } = await db('groups').insert(group);
  // const [res] = await db('groups').insert(group);
  return rowCount;
}

function getGroupByName(name) {
  return db('groups')
    .select()
    .where({ name })
    .first();
}

async function addUserToGroup(user_id, group_id) {
  const response = await db('users_groups').insert(user_id, group_id);
  // const [added] = await db('users_groups').insert(memberToAdd);
  console.log('RES FROM ADDUSERTOGROUP:', response);
  return response;
}

function getUsersGroups() {}
