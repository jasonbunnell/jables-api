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

// Include other resource routers
const eventRouter = require('./events');

const router = express.Router();

// Re-route into other resource routers
router.use('/:attractionId/events', eventRouter);

router.route('/radius/:zipcode/:distance').get(getAttractionsInRadius);

router.route('/:id/photo').put(attractionPhotoUpload);

router.route('/')
    .get(getAttractions)
    .post(createAttraction);

router.route('/:id')
    .get(getAttraction)
    .put(updateAttraction)
    .delete(deleteAttraction);

module.exports = router;