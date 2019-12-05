//server.js

const express = require('express');
const bodyParser = require('body-parser');

const user = require('./routes/user.route'); // Imports routes for user
const song = require('./routes/song.route'); // Imports routes for song
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://musicadmin:abcd1234@cluster0-qrdby.mongodb.net/MUSIC';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/users', user); // Set app for user
app.use('/songs', song); // Set app for song

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});