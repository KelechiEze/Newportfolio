// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 18000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create transporter object using SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kelechieze2000@gmail.com', // Your email
            pass: 'odsw nfpg nghy jyum',        // Your email password or app-specific password
        },
    });

    // Email content
    let mailOptions = {
        from: email, // Sender's email (from the form)
        to: 'kelechieze2000@gmail.com', // Your email address (where the form data will be sent)
        subject: subject || 'No Subject',
        cc: '	ugwuisaaciu@gmail.com',
        html: `
            <h2>New message from your website</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p> 
            `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

// Start the server
app.listen(port, () => {
    
    console.log(`Server is running on http://localhost:${port}`);

});
