const Report = require('../models/report'); // Import your Report model

// Controller function to submit a report
exports.submitReport = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create a new report instance
        const newReport = new Report({
            name,
            email,
            subject,
            message,
        });

        // Save the report to the database
        const savedReport = await newReport.save();

        res.status(201).json(savedReport); // Respond with the saved report
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to fetch all reports
exports.getAllReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports); // Respond with all reports
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
