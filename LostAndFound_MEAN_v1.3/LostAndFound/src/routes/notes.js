const express = require('express');
const router = express.Router();
const {isAuthenticated } = require('../helpers/auth');
const note = require('../controllers/note.controller');

router.get('/notes/add',isAuthenticated,note.addNote);

router.post('/notes/new-note',isAuthenticated,note.createNote);

router.get('/notes',isAuthenticated,note.getNotes);

router.get('/notes/edit/:id',isAuthenticated, note.getNote);

router.put('/notes/edit-note/:id',isAuthenticated ,note.editNote);

router.delete('/notes/delete/:id',isAuthenticated,note.deleteNote);

module.exports = router;