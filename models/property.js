const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  owner: { type: String, required: true },
  contact: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  rooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  balconies: { type: Number, required: true },
  area: { type: Number, required: true },
  furnishing: { type: String, required: true },
  description: { type: String, required: true },
  amenities: { type: [String], required: true },
  images: { type: [String], required: true },
  footage: { type: [String], required: false }
});

const Property = mongoose.model('Property', propertySchema);
module.exports = Property;
