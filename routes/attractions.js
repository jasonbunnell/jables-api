const express = require('express');
const { 
    getAttraction, 
    getAttractions, 
    createAttraction, 
    updateAttraction, 
    deleteAttraction,
    getAttractionsInRadius,
    attractionPhotoUpload
} = require('../controllers/attractions');

const Attraction = require('../models/Attraction');

const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const eventRouter = require('./events');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:attractionId/events', eventRouter);

router.route('/radius/:zipcode/:distance').get(getAttractionsInRadius);

router.route('/:id/photo').put(protect, attractionPhotoUpload);


// Advanced results should pass in the model and populate field
router.route('/')
    .get(advancedResults(Attraction, 'events'), getAttractions)
    .post(protect, createAttraction);

router.route('/:id')
    .get(getAttraction)
    .put(protect, updateAttraction)
    .delete(protect, deleteAttraction);

module.exports = router;