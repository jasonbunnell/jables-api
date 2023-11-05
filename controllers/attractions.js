const Attraction = require('../models/Attraction');

// @desc    Get all attractions
// @route   GET /api/v1/attractions
// @access  Public
exports.getAttractions = async (req, res, next) => {
    try {
        const attractions = await Attraction.find();
        res.status(200).json({ 
            success: true, 
            count: attractions.length, 
            data: attractions 
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
}

// @desc    Get single attraction
// @route   GET /api/v1/attractions:id
// @access  Public
exports.getAttraction = async (req, res, next) => {
    try {
        const attraction = await Attraction.findById(req.params.id);
        if(!attraction) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ 
            success: true,
            data: attraction 
        });
    } catch (err) {
        res.status(400).json({ success: false });
    }
}

// @desc    Create new attraction
// @route   POST /api/v1/attractions
// @access  Private
exports.createAttraction = async (req, res, next) => {
    try {
        const attraction = await Attraction.create(req.body);
        res.status(201).json({ 
            success: true, 
            data: attraction 
        });        
    } catch (err) {
     res.status(400).json({ success: false });   
    }
}

// @desc    Update attraction
// @route   PUT /api/v1/attractions/:id
// @access  Private
exports.updateAttraction = async (req, res, next) => {
    try {
        const attraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!attraction) {
            return res.status(400).json({ success: false });
        }
    
        res.status(200).json({ success: true, data: attraction });        
    } catch (err) {
        res.status(400).json({ success: false });   
    }
};

// @desc    Delete attraction
// @route   DELETE /api/v1/attractions/:id
// @access  Private
exports.deleteAttraction = async (req, res, next) => {
    try {
        const attraction = await Attraction.findByIdAndDelete(req.params.id);
        if(!attraction) {
            return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(400).json({ success: false });
    }
}