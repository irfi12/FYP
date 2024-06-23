const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ahmedjutt891:MJhASiLdZxQMJdSU@backend-db.y6bbw6g.mongodb.net/?retryWrites=true&w=majority&appName=Backend-db");
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
