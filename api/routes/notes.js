const express = require('express');
const router = express.Router();
const file = require('../reader.js');


router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/notes', function (req, res, next) {
    let data = file.read('notes');
    if (data) res.status(200).json(data);
    else res.status(400).json({status: 400, message: "Error getting notes"})
});

router.put('/note/:noteId', function () {
    try {
        let id = parseInt(req.params.noteId);
        let data = req.body;
        console.log(data);
        if (id) {
            let updated = file.update(id, 'notes', data);
            if (deleted) {
                let data = {
                    "status": 20,
                    "message": "Note updated successfully"
                };
                res.status(200).json(data)
            } else {
                let err = {
                    status: 400,
                    message: "Error updating note"
                };
                res.status(400).json(err)
            }
        }
        else {
            let err = {
                status: 400,
                message: "Incomplete parameters to complete this request"
            };
            res.status(400).json(err);
        }
    }
    catch (err){

    }

});


router.post('/add-note', function (req, res, next) {
    let notes = file.read('notes');
    if (req.body.text && req.body.title) {
        let data = {
            id: notes.length ? notes.length + 1 : 1,
            "title": req.body.title,
            date: new Date(),
            "note": req.body.text
        };

        let err = {
            "status": 400,
            "message": "Your note couldn't be saved"
        };

        let written = file.write(data, 'notes');
        if (written) res.status(201).json(data);
        else res.status(400).json(err);

    } else {
        let err = {
            status: 400,
            message: "Incomplete parameters to complete this request"
        };
        res.status(400).json(err);
    }
});

router.post('/delete-note/:noteId', function (req, res, next) {
    let id = req.params.noteId;
    if (parseInt(id)) {
        let deleted = file.delete(id, 'notes');
        if (deleted) {
            let data = {
                "status": 200,
                "message": "Noted deleted successfully"
            };
            res.status(200).json(data)
        } else {
            let err = {
                status: 400,
                message: "Error deleting note"
            };
            res.status(400).json(err)
        }
    }
    else {
        let err = {
            status: 400,
            message: "Incomplete parameters to complete this request"
        };
        res.status(400).json(err);
    }
})
;

module.exports = router;
