const express = require('express');
const router = express.Router();
const { getRecommendations } = require('../controllers/recommendationController');
const { Property } = require('../models/property') // Adjust the path as needed

// Fetch all properties
router.get('/allRecommendations', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch recommended properties based on a given property ID
router.get('/recommendations/:id', async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // Example logic: Find properties with the same type and location
        const recommendations = await Property.find({
            type: property.type,
            location: property.location,
            _id: { $ne: propertyId }
        }).limit(5);

        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
