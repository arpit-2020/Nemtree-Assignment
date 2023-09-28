
// const User = require('../models/User');
// const xlsx = require('xlsx');
// module.exports.RenderUpload = (req,res)=>{

//     return res.render( 'home' , {
//         title: "Home" 
//     }) ;
// }
// const importUser = async (req, response) => {
//     try {
//         console.log("chal rha hai ");
//         if (!req.file) {
//             throw new Error('No file uploaded');
//         }
        
//         // Load the Excel file using the xlsx library
//         const workbook = xlsx.readFile(req.file.path);
//         const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
        
//         // Convert the sheet data to JSON
//         const userData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
//         const formattedUserData = userData.map((row) => ({
//             Name: row['Name of the Candidate'],
//             Email: row['Email'],
//             MobileNo: row['Mobile No.'],
//             DateofBirth: row['Date of Birth'],
//             WorkExperience: row['Work Experience'],
//             ResumeTitle: row['Resume Title'],
//             CurrentLocation: row['Current Location'],
//             PostalAddress: row['Postal Address'],
//             CurrentEmployer: row['Current Employer'],
//             CurrentDesignation: row['Current Designation'],
//         }));

//         await User.insertMany(formattedUserData);
// // response.redirect('/importUser');
//         response.status(200).json({ status: 200, success: true, msg: 'Data imported successfully' });
//     } catch (error) {
//         response.status(400).json({ status: 400, success: false, msg: error.message });
//     }
// };

// module.exports = {
//     importUser
// };
const User = require('../models/User');
const xlsx = require('xlsx');

// Render the upload form page
module.exports.RenderUpload = (req, res) => {
    return res.render('home', {
        title: "Home"
    });
}

// Import user data from Excel
const importUser = async (req, response) => {
    try {
        console.log("chal rha hai ");
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        // Load the Excel file using the xlsx library
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet

        // Convert the sheet data to JSON
        const userData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const formattedUserData = userData.map((row) => ({
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
        }));

        await User.insertMany(formattedUserData);

        // Redirect to the thank you page on successful import
        response.redirect('/thankyou');
    } catch (error) {
        response.status(400).json({ status: 400, success: false, msg: error.message });
    }
};

module.exports = {
    importUser
};

