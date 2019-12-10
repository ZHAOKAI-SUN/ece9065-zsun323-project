const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');


////// 1 : Linked to the controller (Each function has its own controller)
const ctrlUser = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');


////// 2 : Add router path

//// User part
router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile); // private route !!! add: verifyJwtToken !!!!!
router.get('/activate/:token', ctrlUser.activateUser); // Activate email
router.post('/resend', ctrlUser.resend);

//// Sony part
// TEST
router.get('/testSong', song_controller.test);
// CREATE
router.post('/createSong', song_controller.song_create);
// READ all
router.get('/readallSong', song_controller.song_read);
// READ one by ID
router.get('/:id/readSong', song_controller.song_details);
// READ TOP 10
router.get('/readTOP10', song_controller.song_top10);
// UPDATE
router.put('/:id/updateSong', song_controller.song_update);
// DELETE
router.delete('/:id/deleteSong', song_controller.song_delete);



////// Just keep it
module.exports = router;