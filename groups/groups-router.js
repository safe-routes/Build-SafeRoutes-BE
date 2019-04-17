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
    const addedGroupCount = await Groups.addGroup(group);
    if (addedGroupCount) {
      const newGroup = await Groups.getGroupByName(group.name);
      if (newGroup) {
        const addedGroupMember = await Groups.addUserToGroup({
          user_id,
          group_id: newGroup.id
        });
        if (addedGroupMember) {
          res.status(201).json({ newGroup, user_id });
        }
      }
    } else {
      res.status(500).json({ message: 'Group could not be created.' });
    }
  } catch (error) {
    res.status(405).json({ message: 'Group name already taken.' });
  }
});

module.exports = router;
