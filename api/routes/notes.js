const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/notes');

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/notes', noteCtrl.all);

router.put('/note/:noteId', noteCtrl.update);

router.post('/notes', noteCtrl.create);

router.delete('/note/:noteId', noteCtrl.remove);

module.exports = router;
