const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Attraction = require('./models/Attraction');
const Event = require('./models/Event');
const Entertainer = require('./models/Entertainer');
const Song = require('./models/Song');

// Connect to database
mongoose.connect(process.env.MONGO_URI, {});

// Read JSON files
// const attractions = JSON.parse(fs.readFileSync(`${__dirname}/_data/attractions.json`, 'utf-8'));
// const events = JSON.parse(fs.readFileSync(`${__dirname}/_data/events.json`, 'utf-8'));
const songs = JSON.parse(fs.readFileSync(`${__dirname}/_data/songs.json`, 'utf-8'));
// const events = JSON.parse(fs.readFileSync(`${__dirname}/_data/events-test.json`, 'utf-8'));

// Import into database
const importData = async () => {
    try {
        // await Attraction.create(attractions);
        // await Event.create(events);
        await Song.create(songs);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async () => {
    try {
        // await Attraction.deleteMany();
        // await Event.deleteMany();
        await Song.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i') {
    importData();
} else if(process.argv[2] === '-d') {
    deleteData();
}