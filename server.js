const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// File uploading
app.use(fileupload());

// Dev logging middleware
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Route files
const attractions = require('./routes/attractions');
const events = require('./routes/events');
const auth = require('./routes/auth');
const entertainers = require('./routes/entertainers');
const videos = require('./routes/videos');
const songs = require('./routes/songs');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/attractions', attractions);
app.use('/api/v1/events', events);
app.use('/api/v1/auth', auth);
app.use('/api/v1/entertainers', entertainers);
app.use('/api/v1/videos', videos);
app.use('/api/v1/songs', songs);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT, 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    // Close server and exit process
    server.close(() => process.exit(1));
});