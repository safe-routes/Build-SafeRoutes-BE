const db = require('../data/dbConfig.js');

module.exports = {
  addGroup,
  getGroupByName,
  addUserToGroup
};

async function addGroup(group) {
  const { rowCount } = await db('groups').insert(group);
  console.log(rowCount);
  // const [res] = await db('groups').insert(group);
  return rowCount;
}

// async function addUser(user) {
//   const { rowCount } = await db('users').insert(user);
//   return rowCount;
// }

function getGroupByName(name) {
  return db('groups')
    .select()
    .where({ name })
    .first();
}

async function addUserToGroup(memberToAdd) {
  const res = await db('users_groups').insert(memberToAdd);
  // const [added] = await db('users_groups').insert(memberToAdd);
  console.log('RES FROM ADDUSERTOGROUP:', res);
  return rowCount;
}
