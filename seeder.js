const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Attraction = require('./models/Attraction');
const Event = require('./models/Event');

// Connect to database
mongoose.connect(process.env.MONGO_URI, {});

// Read JSON files
const attractions = JSON.parse(fs.readFileSync(`${__dirname}/_data/attractions.json`, 'utf-8'));
// const events = JSON.parse(fs.readFileSync(`${__dirname}/_data/events.json`, 'utf-8'));
// const events = JSON.parse(fs.readFileSync(`${__dirname}/_data/events-test.json`, 'utf-8'));

// Import into database
const importData = async () => {
    try {
        await Attraction.create(attractions);
        // await Event.create(events);
        console.log('Data Imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async () => {
    try {
        await Attraction.deleteMany();
        // await Event.deleteMany();
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