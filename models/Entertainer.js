const mongoose = require('mongoose');

const EntertainerSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please add an entertainer name']
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            'band',
            'musician',
            'dj',
            'comedian',
            'magician',
            'speaker',
            'troupe',
            'test'
        ]
    },
    members: [
        {
            _id: false,
            name: {
                type: String,
                required: [true, 'Please add a member name']
            },
            role: {
                type: String,
                required: [true, 'Please add a member role']
            }
        }
    ],
    manager: {
        type: String
    },
    address: {
        type: String
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    mediaRightsManagement: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    toJSON: { virtuals: true },
    toObject: {virtuals: true }
});

// Reverse populate with virtuals
// local field
// foreign field = field in Event model that refers to this model
// justOne - gets an array of, in this case, events
EntertainerSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'entertainer',
    justOne: false
});

// Reverse populate with virtuals
// local field
// foreign field = field in Event model that refers to this model
// justOne - gets an array of, in this case, events
EntertainerSchema.virtual('songs', {
    ref: 'Song',
    localField: '_id',
    foreignField: 'entertainer',
    justOne: false
});

module.exports = mongoose.model('Entertainer', EntertainerSchema);