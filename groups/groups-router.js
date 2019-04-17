const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Groups = require('./groups-model.js');

// router.get('/', async (req, res) => {
//   const msg = await Groups.addGroup();
//   res.send(msg);
// });

router.post('/', async (req, res) => {
  const group = { name: req.body.name, passphrase: req.body.passphrase };
  const { user_id } = req.body;

  const hashedPassphrase = bcrypt.hashSync(group.passphrase, 10);
  group.passphrase = hashedPassphrase;

  try {
    const addedGroupCount = await Groups.addGroup(group);
    if (addedGroupCount) {
      const newGroup = await Groups.getGroupByName(group);
      if (newGroup) {
        const addedGroupMember = await Groups.addUserToGroup(user_id);
        if (addedGroupMember) {
          res.status(201).json({ newGroup, addedGroupMember });
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Group could not be created.' });
  }
});

module.exports = router;
