const express = require('express');
const { 
    getAttraction, 
    getAttractions, 
    createAttraction, 
    updateAttraction, 
    deleteAttraction,
    getAttractionsInRadius
} = require('../controllers/attractions');

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getAttractionsInRadius)

router.route('/')
    .get(getAttractions)
    .post(createAttraction);

router.route('/:id')
    .get(getAttraction)
    .put(updateAttraction)
    .delete(deleteAttraction);

module.exports = router;