const mongoose = require('mongoose');

const EventBookmarkSchema = new mongoose.Schema({
    bookbark: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    event: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});




module.exports = mongoose.model('EventBookmark', EventBookmarkSchema);