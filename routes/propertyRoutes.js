const express = require('express');

const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { updateProperty, postProperty, getProperties, getPropertyById, deleteProperty } = require('../controllers/propertyController');
const multer = require('multer');

// Configure multer for file uploads (images and 3D footage)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'images') {
            cb(null, 'uploads/images/');
        } else if (file.fieldname === 'footage') {
            cb(null, 'uploads/3d-footage/');
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Multer file upload configurations with limits
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 50 // 50MB file size limit for all files
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'images' && file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else if (file.fieldname === 'footage' && (file.mimetype === 'video/mp4' || file.mimetype.includes('model'))) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Route to post property with images and 3D footage
router.post('/property',
    upload.fields([{ name: 'images', maxCount: 12 }, { name: 'footage', maxCount: 1 }]),
    postProperty
);

// Route to fetch all properties
router.get('/properties', getProperties);

router.get('/property/:id', getPropertyById)

router.post('/property/:id', updateProperty)

router.delete('/property/:id', deleteProperty)


module.exports = router;