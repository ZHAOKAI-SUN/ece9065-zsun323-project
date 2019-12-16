const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});
 
// Add Schema every time!!
require('./user.model');
require('./song.model');
require('./review.model');
require('./playlist.model');
require('./plinfo.model');