const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');


////// 1 : Linked to the controller (Each function has its own controller)
const ctrlUser = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');


////// 2 : Add router path

//// User part
router.post     ('/user/open/register', ctrlUser.register);
router.post     ('/user/open/authenticate', ctrlUser.authenticate);
router.get      ('/user/secure/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile); // private route !!! add: verifyJwtToken !!!!!
router.get      ('/user/open/activate/:token', ctrlUser.activateUser); // Activate email
router.post     ('/user/open/resend', ctrlUser.resend);

//// Song part
// TEST
router.get      ('/song/open/testSong', song_controller.test);
// CREATE
router.post     ('/song/secure/createSong', song_controller.song_create);
// READ all
router.get      ('/song/open/readallSong', song_controller.song_read);
// READ one by ID
router.get      ('/song/open/:id/readSong', song_controller.song_details);
// READ TOP 10
router.get      ('/song/open/readTOP10', song_controller.song_top10);
// SEARCH
router.get      ('/song/open/searchSong/:id', song_controller.song_search);
// UPDATE
router.put      ('/song/secure/:id/updateSong', song_controller.song_update);
// DELETE
router.delete   ('/song/secure/:id/deleteSong', song_controller.song_delete);

//// review part
// TEST
router.get      ('/review/open/testReview', review_controller.test);
// CREATE
router.post     ('/review/secure/createReview', review_controller.review_create);
// READ all
router.get      ('/review/open/readallReview', review_controller.review_read);
// SEARCH
router.get      ('/review/open/searchReview/:id', review_controller.review_search);



////// Just keep it
module.exports = router;