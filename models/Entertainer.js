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
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    manager: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, {
    toJSON: { virtuals: true },
    toObject: {virtuals: true }
});

// Geocode & create location field
AttractionSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }
    
    // Do not save address in DB
    this.address = undefined;
    next();
});

// Reverse populate with virtuals
// local field
// foreign field = field in Event model that refers to this model
// justOne - gets an array of, in this case, events
AttractionSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'entertainer',
    justOne: false
});

// Reverse populate with virtuals
// local field
// foreign field = field in Event model that refers to this model
// justOne - gets an array of, in this case, events
AttractionSchema.virtual('events', {
    ref: 'Song',
    localField: '_id',
    foreignField: 'attraction',
    justOne: false
});

module.exports = mongoose.model('Attraction', AttractionSchema);