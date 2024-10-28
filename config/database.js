const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017", {
            serverSelectionTimeoutMS: 15000 // Increase timeout to 5 seconds}
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

// mongodb+srv://mahmedmalhi786786:jlekto0s5B5yfqzn@asanghar.swoq4.mongodb.net