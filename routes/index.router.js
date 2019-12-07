const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');

const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile); // private route !!! add: verifyJwtToken !!!!!
router.get('/activate/:token', ctrlUser.activateUser); // Activate email

module.exports = router;