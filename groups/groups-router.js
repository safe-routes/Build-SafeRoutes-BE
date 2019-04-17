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

    if (alreadyExists !== undefined) {
      res.status(405).json({
        message: 'Group name already taken.'
      });
    } else {
      const addedGroupCount = await Groups.addGroup(group);
      if (addedGroupCount) {
        const newGroup = await Groups.getGroupByName(group.name);
        if (newGroup) {
          const memberToAdd = {
            user_id,
            group_id: newGroup.id
          };
          newGroupMinusPassphrase = {
            id: newGroup.id,
            name: newGroup.name,
            created_at: newGroup.created_at,
            user_id
          };
          const addedGroupMember = await Groups.addUserToGroup(memberToAdd);
          if (addedGroupMember) {
            res.status(201).json(newGroupMinusPassphrase);
          }
        }
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Group could not be created.' });
  }
});

router.post('/:id', async (req, res) => {
  const allGroupInfo = req.body;
  const newMemberId = req.params.id;

  try {
    const group = await Groups.getGroupByName(allGroupInfo.groupname);
    if (group) {
      if (
        group &&
        bcrypt.compareSync(allGroupInfo.passphrase, group.passphrase)
      ) {
        const memberToAdd2 = {
          user_id: newMemberId,
          group_id: group.id
        };

        const addUserToGroup = await Groups.addUserToGroup(memberToAdd2);
        if (addUserToGroup) {
          const allGroupInfo2 = await Groups.getGroupByName(
            allGroupInfo.groupname
          );

          console.log(memberToAdd2.group_id);
          const allUsers = await Groups.allUsersInGroup(memberToAdd2.group_id);

          res.status(200).json({ allGroupInfo2, allUsers });
        } else {
          res.status(500).json({ message: 'Could not be added to the group.' });
        }
      } else {
        res.status(401).json({ message: 'Invalid credentials.' });
      }
    } else {
      res.status(404).json({ message: 'Group could not be found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Could not be added to the group.' });
  }
});

router.get('/:id', async (req, res) => {
  const group_id = req.params.id;
  const { name } = req.body;
  try {
    const group = await Groups.getGroupByName(name);
    const members = await Groups.allUsersInGroup(group_id);

    res.status(200).json({ group, members });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
