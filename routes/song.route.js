//////////////////////////////////////////////////////////////////////
// Has been replaced by index.
// This file was not called.
// The reason this file is still here is to save the history code.
//////////////////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', song_controller.test);
module.exports = router;

// CREATE
router.post('/create', song_controller.song_create);

// READ all
router.get('/read', song_controller.song_read);

// READ one by ID
router.get('/:id', song_controller.song_details);

// UPDATE
router.put('/:id/update', song_controller.song_update);

// DELETE
router.delete('/:id/delete', song_controller.song_delete);