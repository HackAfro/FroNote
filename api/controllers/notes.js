/**
 * Created by Afro on 10/19/2017.
 */
const model = require('../model');
const {User, Note, Tweet} = model;

const notesController = {
    all(req, res){
        //Returns all notes
        Note.find({})
            .exec((err, notes) => res.json(notes))
    },
    byId(req, res){
        "use strict";
        const idParam = req.params.id;
        Note.findOne({_id: idParam})
            .exec((err, note) => res.json(note))
    },
    create(req, res) {
        "use strict";
        const data = req.body;
        if (data.text && data.title) {
            let newData = {
                "title": req.body.title,
                "note": req.body.text
            };

            let newNote = new Note(newData);

            newNote.save((err, savedNote) => {
                Note
                    .findOne({_id: savedNote._id})
                    .exec((err, note) => {
                        res.status(201).json(note);
                    })
            });

            let err = {
                "status": 400,
                "message": "Your note couldn't be saved"
            };

        } else {
            let err = {
                status: 400,
                message: "Incomplete parameters to complete this request"
            };
            res.status(400).json(err);
        }
    },
    update(req, res){
        "use strict";
        const idParam = req.params.noteId;
        let note = req.body;
        // Finds a product to be updated
        Note.findOne({_id: idParam}, (err, data) => {
            // Updates the product payload
            data.title = note.title;
            data.note = note.note;
            // Saves the product
            data.save((err, updated) => res.json(updated));
        })
    },
    remove (req, res) {
        const idParam = req.params.noteId;
        // Removes a product
        console.log(idParam);
        Note.findOne({_id: idParam}).remove((err, removed) => res.json(idParam))
    }

};

module.exports = notesController;