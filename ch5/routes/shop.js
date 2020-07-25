const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('<h>Hello from Express JS</h>');
});

module.exports = router;
