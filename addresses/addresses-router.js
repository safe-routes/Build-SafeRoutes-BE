const router = require('express').Router();
const { authenticate } = require('../auth/authenticate-middleware.js');

router.get('/', authenticate, (req, res) => {
  res.status(200).json({
    message: 'success'
  });
});

module.exports = router;
