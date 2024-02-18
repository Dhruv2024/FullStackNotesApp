const express = require('express');
const { createNote, deleteNote, updateNote, getAllNotes, getNoteDetail } = require('../controllers/Notes');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.post("/createNote", auth, createNote);
router.post("/deleteNote", auth, deleteNote);
router.post("/updateNote", auth, updateNote);
router.get("/getNotes", auth, getAllNotes);
router.post("/getSingleNote", auth, getNoteDetail);
module.exports = router;