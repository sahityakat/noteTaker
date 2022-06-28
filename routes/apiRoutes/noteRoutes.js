const router = require("express").Router();
var uniqid = require('uniqid');

const fs = require('fs');
const path = require('path');

router.get('/notes', (req, res) => {
    const notes = readNotes();
    return res.json(notes);
});

router.post('/notes', (req, res) => {
    const notes = readNotes();

    // set id based on what the next index of the array will be
    req.body.id = uniqid();

    // add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);

    res.json(note);
});

router.delete('/notes/:id', (req, res) => {
    const notes = readNotes();
    var id = req.params.id;
    const updatedNotes = notes.filter(note => note.id !== id);
    fs.writeFileSync(
        'db/db.json',
        JSON.stringify(updatedNotes, null, 2)
    );
   
    return res.status(201).end();
})

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);

    fs.writeFileSync(
        'db/db.json',
        JSON.stringify( notesArray, null, 2)
    );

    return note;
}

function readNotes() {
    const notes = JSON.parse(fs.readFileSync('db/db.json'));
    return notes;
}
  
module.exports = router;