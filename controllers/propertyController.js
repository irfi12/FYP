const Property = require('../models/property');

exports.postProperty = async (req, res) => {
    try {
        // Extract fields from req.body and req.files
        const {
            title,
            location,
            price,
            owner,
            contact,
            type,
            status,
            date,
            rooms,
            bathrooms,
            balconies,
            area,
            furnishing,
            description,
            amenities,
        } = req.body;

        console.log("After getting Body: ", req.body)

        const images = req.files?.images?.map(file => file.path); // Assuming req.files is populated by Multer
        const threeDfootage = req.files?.footage?.map(oneFootage => oneFootage.path)

        console.log("Images: ", images)
        console.log("Footage: ", threeDfootage)

        // Create new Property instance
        const property = new Property({
            title,
            location,
            price,
            owner,
            contact,
            type,
            status,
            date,
            rooms,
            bathrooms,
            balconies,
            area,
            furnishing,
            description,
            amenities,
            images,
            footage: threeDfootage
        });

        console.log("New Property: ", property)

        // Save property to database
        await property.save();

        console.log('Property Saved: ', property)

        // Send response with the saved property
        return res.status(201).json(property);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
};

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find(); // Fetch all properties from the database
        res.status(200).json(properties);
    } catch (err) {
        console.error('Error fetching properties:', err);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
};

// Controller for fetching a specific property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const propertyId = req.params.id; // Get property ID from the request params
        const property = await Property.findById(propertyId); // Find the property by its ID

        if (!property) {
            return res.status(404).json({ error: 'Property not found' }); // Return 404 if property is not found
        }

        return res.status(200).json(property); // Send the property data if found
    } catch (err) {
        console.error('Error fetching property:', err);
        return res.status(500).json({ error: 'Failed to fetch property' });
    }
};

// DELETE request to delete a property by ID
exports.deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.id;

        // Find the property by ID and remove it
        const deletedProperty = await Property.findByIdAndDelete(propertyId);

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        } else
            // Successfully deleted the property
            return res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error('Error deleting property:', error);
        return res.status(500).json({ message: 'Server error, unable to delete property' });
    }
};

exports.updateProperty = async (req, res) => {
    try {
        const propertyId = req.params.id; // Get property ID from the request params
        const updatedData = req.body; // Get the updated data from the request body

        const updatedProperty = await Property.findByIdAndUpdate(propertyId, updatedData, { new: true });

        if (!updatedProperty) {
            return res.status(404).json({ error: 'Property not found' });
        }

        return res.status(200).json(updatedProperty); // Send the updated property data
    } catch (error) {
        console.error('Error updating property:', error);
        return res.status(500).json({ error: 'Failed to update property' });
    }
};

