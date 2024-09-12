const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a song title']
    },
    entertainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Entertainer',
        required: [true, 'Please add an Entertainer']
    },
    album: {
        type: String
    },
    year: {
        type: Number
    },
    genre: {
        type: String
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    toJSON: { virtuals: true },
    toObject: {virtuals: true }
});

// Call getTotalLikes after save
// Call getTotalLikes before remove

module.exports = mongoose.model('Song', SongSchema);