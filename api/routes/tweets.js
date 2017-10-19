const express = require('express');
const router = express.Router();
const tweetsCtrl = require('../controllers/tweets');

/* GET users listing. */
router.get('/tweets', tweetsCtrl.all);

router.post('/tweets', tweetsCtrl.create);

router.delete('/tweet/:tweetId', tweetsCtrl.remove);

module.exports = router;
