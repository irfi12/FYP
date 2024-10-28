const express = require('express');
const router = express.Router();
const { submitReport , getAllReports } = require('../controllers/reportcontroller'); // Adjust the path as needed
const multer = require('multer');

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Adjust the destination folder as per your project structure
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB file size limit
    }
});

// Route to submit a report
router.post('/report', upload.none(), submitReport);

router.get('/reports', upload.none(), getAllReports);

module.exports = router;
