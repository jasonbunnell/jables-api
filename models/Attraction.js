const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const AttractionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add an Attraction name'],
        unique: true,
        trim: true,
        maxlength: [70, 'Name cannot be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    website: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    cms: {
        type: String,
        enum: [
            'WordPress', 
            'Wix', 
            'Squarespace', 
            'Wix', 
            'Drupal',
            'Weebly',
            'custom site', 
            'GoDaddy Website Builder',
            'other'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number cannot be longer than 20 characters']
    },
    email: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please use a valid email address'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
            required: false
        },
        coordinates: {
            type: [Number],
            required: false,
            index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
    },
    hours: {
        type: [
            {
                day: {
                    type: String,
                    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
                },
                timeSlots: [
                    {
                        _id: false, // Disable _id for timeSlots
                        start: {
                            type: String
                        },
                        finish: {
                            type: String
                        }
                    }
                ],
                _id: false // Disable _id for day objects
            }
        ],
        default: [
            { day: 'Sunday', timeSlots: [] },
            { day: 'Monday', timeSlots: [] },
            { day: 'Tuesday', timeSlots: [] },
            { day: 'Wednesday', timeSlots: [] },
            { day: 'Thursday', timeSlots: [] },
            { day: 'Friday', timeSlots: [] },
            { day: 'Saturday', timeSlots: [] }
        ]
    },
    category: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            'Winery',
            'Brewery',
            'Cidery',
            'Distillery',
            'Restaurant',
            'Museum',
            'Casino',
            'Theater',
            'Venue',
            'Farm',
            'Park',
            'Golf Course',
            'Sports',
            "test"
        ]
    },
    awardBadge: {
        type: [String],
        enum: [
            'Promoted',
            'Popular',
            'New',
            'Free',
            'Family'
        ]
    },
    subcategory: {
        // Array of strings
        type: [String],
        enum: [
            'football',
            'state park'
        ]
    },
    avgBookmarks: {
        type: Number
    },
    lake:{
        // Array of strings
        type: String,
        required: true,
        enum: [
            'Seneca',
            'Cayuga',
            'Keuka',
            'Canandaigua',
            'Conesus',
            'Otisco',
            'Skaneateles',
            'Owasco',
            'Hemlock',
            'Honeoye',
            'Canadice',
            'Silver',
            'Ontario',
            'Onondaga',
            'none'
        ]
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    capacity: {
        type: Number
    },
    ticketing: {
        type: [String],
        enum: [
            'Spektrix',
            'Ticketmaster',
            'Accesso',
            'Eventbrite',
            'AXS',
            'TixTrack',
            'Opendate',
            'Tixr'
        ]
    },
    ticketingId: {
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

// Create attraction slug from the name
AttractionSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
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

// Cascade delete events when attraction is deleted
AttractionSchema.pre('remove', async function (next) {
    console.log(`Events being removed and deleted from attraction ${this._id}`);
    await this.model('Event').deleteMany({ event: this._id });
    next();
})

// Reverse populate with virtuals
// local field
// foreign field = field in Event model that refers to this model
// justOne - gets an array of, in this case, events
AttractionSchema.virtual('events', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'attraction',
    justOne: false
});

module.exports = mongoose.model('Attraction', AttractionSchema);