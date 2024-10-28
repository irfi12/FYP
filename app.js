const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/download/:filename', (req, res) => {
    const file = path.join(__dirname, 'uploads/3d-footage', req.params.filename);
    res.download(file, err => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Could not download the file.");
        }
    });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/propertyRoutes'));
app.use('/api', require('./routes/reportRoutes'));
app.use('/api', require('./routes/recommendationRoutes'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));