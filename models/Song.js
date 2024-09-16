const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a song title']
    },
    duration: {
        type: Number
    },
    entertainer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Entertainer'
        // required: [true, 'Please add an Entertainer']
    },
    album: {
        type: String
    },
    releaseDate: {
        type: Date
    },
    genre: {
        type: String,
        required: [true, 'Please add a genre'],
        enum: [
            'rock',
            'pop',
            'rap',
            'country',
            'blues',
            'folk',
            'metal',
            'indie',
            'instrumental',
            'jazz',
            'Christian',
            'test'
        ]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    songFile: {
        type: String
    }

}); 
// {
//     toJSON: { virtuals: true },
//     toObject: {virtuals: true }
// });

// Call getTotalLikes after save
// Call getTotalLikes before remove

module.exports = mongoose.model('Song', SongSchema);