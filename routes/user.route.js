//////////////////////////////////////////////////////////////////////
// Has been replaced by index.
// This file was not called.
// The reason this file is still here is to save the history code.
//////////////////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const user_controller = require('../controllers/user.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', user_controller.test);
module.exports = router;

// CREATE
router.post('/create', user_controller.user_create);

// READ all
router.get('/read', user_controller.user_read);

// READ one by ID
router.get('/:id', user_controller.user_details);

// UPDATE
router.put('/:id/update', user_controller.user_update);

// DELETE
router.delete('/:id/delete', user_controller.user_delete);