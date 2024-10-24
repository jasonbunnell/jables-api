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

// Include other resource routers
const eventRouter = require('./events');
const songRouter = require('./songs');

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:entertainerId/events', eventRouter);
router.use('/:entertainerId/songs', songRouter);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), entertainerPhotoUpload);

router.route('/')
    .get(advancedResults(Entertainer, ['events', 'songs']), getEntertainers)
    .post(protect, authorize('publisher', 'admin'), createEntertainer);

router.route('/:id')
    .get(getEntertainer)
    .put(protect, authorize('publisher', 'admin'), updateEntertainer)
    .delete(protect, authorize('publisher', 'admin'), deleteEntertainer);


module.exports = router;