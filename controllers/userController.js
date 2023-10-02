const User = require('../models/User');
const xlsx = require('xlsx');
const async = require('async');

// Render the upload form page
module.exports.RenderUpload = (req, res) => {
    return res.render('home', {
        title: "Home"
    });
}

// Import user data from Excel
const importUser = async (req, response) => {
    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];

        const userData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Use async.eachSeries to process one candidate at a time
        async.eachSeries(userData, async (row) => {
            const formattedUserData = {
                Name: row['Name of the Candidate'],
                Email: row['Email'],
                MobileNo: row['Mobile No.'],
                DateofBirth: row['Date of Birth'],
                WorkExperience: row['Work Experience'],
                ResumeTitle: row['Resume Title'],
                CurrentLocation: row['Current Location'],
                PostalAddress: row['Postal Address'],
                CurrentEmployer: row['Current Employer'],
                CurrentDesignation: row['Current Designation'],
            };

            // Check if the email ID already exists in the database
            const existingUser = await User.findOne({ Email: formattedUserData.Email });

            if (!existingUser) {
                await User.create(formattedUserData);
            }
        }, (err) => {
            if (err) {
                throw err;
            }
            response.redirect('/thankyou');
        });
    } catch (error) {
        response.status(400).json({ status: 400, success: false, msg: error.message });
    }
};

module.exports = {
    importUser
};
