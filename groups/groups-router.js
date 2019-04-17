const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Groups = require('./groups-model.js');

// router.get('/', async (req, res) => {
//   const msg = await Groups.addGroup();
//   res.send(msg);
// });

router.post('/', async (req, res) => {
  const group = { passphrase: req.body.passphrase, name: req.body.name };
  const { user_id } = req.body;

  const hashedPassphrase = bcrypt.hashSync(group.passphrase, 10);
  group.passphrase = hashedPassphrase;

  try {
    const alreadyExists = await Groups.getGroupByName(group.name);
    console.log(alreadyExists);

    if (alreadyExists !== undefined) {
      res.status(405).json({ message: 'Group name already taken.' });
    } else {
      const addedGroupCount = await Groups.addGroup(group);
      console.log(addedGroupCount);
      if (addedGroupCount) {
        const newGroup = await Groups.getGroupByName(group.name);
        console.log('NEW GROUP:', newGroup);
        if (newGroup) {
          const memberToAdd = {
            user_id,
            group_id: newGroup.id
          };
          console.log(memberToAdd);
          const addedGroupMember = await Groups.addUserToGroup(
            memberToAdd.user_id,
            memberToAdd.group_id
          );
          console.log('addedGroupMember:', addedGroupMember);
          if (addedGroupMember) {
            res.status(201).json({ newGroup, user_id });
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Group could not be created.' });
  }
});

module.exports = router;
