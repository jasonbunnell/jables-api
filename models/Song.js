const mongoose = require('mongoose');
const slugify = require('slugify');

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
        ref: 'Entertainer',
        required: [true, 'Please add an Entertainer']
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    songFile: {
        type: String
    },
    slug: String
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create song slug from the title
SongSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

module.exports = mongoose.model('Song', SongSchema);