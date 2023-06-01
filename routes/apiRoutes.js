const router = require("express").Router();

const db = require('../db/database.js');

router.get('/notes', (req,res) => {
db.getAllNotes()
.then((notes) => {
  return res.json(notes);
})
.catch((err) => res.status(500).json(err))
})

router.post('/notes', (req,res) => {
  db.addNote(req.body)
  .then((notes) => res.json(notes))
  .catch((err) => res.status(500).json(err))
})

router.delete('/notes/:id', (req,res) => {
  db.removeNote(req.params.id)
  .then(() => res.json({ok:true}))
  .catch((err) => res.status(500).json(err))
})


module.exports = router;