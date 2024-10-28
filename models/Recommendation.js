const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    type: { type: String, required: true },
    images: [String], // Array of image URLs
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
