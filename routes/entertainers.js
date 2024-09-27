const express = require('express');
const { 
    getEntertainers, 
    getEntertainer, 
    createEntertainer,
    updateEntertainer, 
    deleteEntertainer,
    entertainerPhotoUpload 
} = require('../controllers/entertainers');

const Entertainer = require('../models/Entertainer');

const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const eventRouter = require('./events');
const songRouter = require('./songs');

const router = express.Router();

// Re-route into other resource routers
router.use('/:entertainerId/events', eventRouter);
router.use('/:entertainerId/songs', songRouter);

router.route('/:id/photo').put(entertainerPhotoUpload);

router.route('/')
    .get(advancedResults(Entertainer, ['events', 'songs']), getEntertainers)
    .post(createEntertainer);

router.route('/:id')
    .get(getEntertainer)
    .put(updateEntertainer)
    .delete(deleteEntertainer);


module.exports = router;