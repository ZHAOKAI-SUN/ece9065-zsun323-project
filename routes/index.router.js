const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');


////// 1 : Linked to the controller (Each function has its own controller)
const ctrlUser = require('../controllers/user.controller');
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');
const playlist_controller = require('../controllers/playlist.controller');
const plinfo_controller = require('../controllers/plinfo.controller');


////// 2 : Add router path

//// User part
router.post     ('/user/open/register', ctrlUser.register);
router.post     ('/user/open/authenticate', ctrlUser.authenticate);
router.get      ('/user/secure/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile); // private route !!! add: verifyJwtToken !!!!!
router.get      ('/user/open/activate/:token', ctrlUser.activateUser); // Activate email
router.post     ('/user/open/resend', ctrlUser.resend);
router.get      ('/user/secure/readallUser', ctrlUser.user_read); // read all user
router.put      ('/user/secure/:id/updateUser', ctrlUser.user_update); // update user

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

//// playlist part
// TEST
router.get      ('/playlist/open/testPlaylist', playlist_controller.test);
// CREATE
router.post     ('/playlist/secure/createPlaylist', playlist_controller.playlist_create);
// READ all
router.get      ('/playlist/open/readallPlaylist', playlist_controller.playlist_read);
// READ one by ID
router.get      ('/playlist/open/:id/readPlaylist', playlist_controller.playlist_details);
// SEARCH (Search only playlists with "public" status)
router.get      ('/playlist/open/searchPlaylist/:id', playlist_controller.playlist_search);
// SEARCH MY (Search all playlists)
router.get      ('/playlist/open/searchmyPlaylist/:id', playlist_controller.playlist_searchmy);
// UPDATE
router.put      ('/playlist/secure/:id/updatePlaylist', playlist_controller.playlist_update);
// DELETE
router.delete   ('/playlist/secure/:id/deletePlaylist', playlist_controller.playlist_delete);

//// playlistinfo part
// TEST
router.get      ('/plinfo/open/testPlinfo', plinfo_controller.test);
// CREATE
router.post     ('/plinfo/secure/createPlinfo', plinfo_controller.plinfo_create);
// SEARCH
router.get      ('/plinfo/open/searchPlinfo/:id', plinfo_controller.plinfo_search);
// DELETE
router.delete   ('/plinfo/secure/:id/deletePlinfo', plinfo_controller.plinfo_delete);



////// Just keep it
module.exports = router;