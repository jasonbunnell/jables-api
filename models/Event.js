const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add an event title']
    },
    description: {
        type: String
    },
    category: {
        // Array of strings
        type: [String],
        required: [true, 'Please add a category'],
        enum: [
            'music',
            'theater',
            'games',
            'sports',
            'nerdy',
            'family',
            'lecture',
            'comedy'
        ]
    },
    subcategory: {
        // Array of strings
        type: [String],
        enum: [
            'musical',
            'football',
            'baseball'
        ]
    },
    startTime: {
        type: Date,
        required: [true, "Please add a start date"]
    },
    endTime: {
        type: Date
    },
    bookmarked: {
        type: [String]
    },
    images: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    source: {
        type: String,
        enum: [
            'direct',
            'plugin',
            'TicketMaster'
        ],
        default: 'direct'
    },
    promoter: {
        type: String
    },
    organizer: {
        type: String
    },
    attraction: {
        type: mongoose.Schema.ObjectId,
        ref: 'Attraction',
        required: [true, 'Please add an Attraction as location']
    },
    altTitle: {
        type: mongoose.Schema.ObjectId,
        ref: 'Entertainer'
    },
    bookmarks: {
        type: Number
    },
    likes: {
        type: Number
    }
});

module.exports = mongoose.model('Event', EventSchema);