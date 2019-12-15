const mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({

    title: {
        type: String
    },
    titleid: {
        type: String
    },
    addname: {
        type: String
    },
    addtime: {
        type: Date
    },
    rate: {
        type: Number,
        required: 'You have to choose a rating'
    },
    text: {
        type: String,
        required: 'Comment text must be added'
    }
});

mongoose.model('Review', reviewSchema);