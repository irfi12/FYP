const Property = require('../models/Recommendation');

exports.getRecommendations = async (req, res) => {
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

        res.status(200).json(recommendations);
    } catch (err) {
        console.error('Error fetching recommendations:', err);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};
