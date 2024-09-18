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

// Create transporter object using SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kelechieze2000@gmail.com', // Your email
        pass: 'odsw nfpg nghy jyum',        // Your email password or app-specific password
    },
});

// Route to handle form submission
app.post('/send', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Mail options for the website owner
    let ownerMailOptions = {
        from: email,
        to: 'kelechieze2000@gmail.com',
        subject: subject || 'No Subject',
        cc: 'ugwuisaaciu@gmail.com', 
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #2c3e50; text-align: center; padding-bottom: 10px;">New Message from Your Website</h2>
                <p style="font-size: 16px;">Hello,</p>
                <p style="font-size: 16px;">You have received a new message from the contact form on your website. Here are the details:</p>
                <table style="width: 100%; font-size: 16px; border-collapse: collapse;">
                    <tr style="background-color: #f9f9f9;">
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject || 'No Subject'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${message}</td>
                    </tr>
                </table>
                <p style="font-size: 16px; margin-top: 20px;">Kind regards,<br><strong>Your Website</strong></p>
                <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">This email was automatically generated. Please do not reply.</p>
            </div>
        `,
    };

    // Mail options for user confirmation
    let userMailOptions = {
        from: 'kelechieze2000@gmail.com', // The sender's email address
        to: email,
        subject: 'We Have Received Your Message',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd;">
                <h2 style="color: #2c3e50; text-align: center; padding-bottom: 10px;">Thank You for Your Message</h2>
                <p style="font-size: 16px;">Hello ${name},</p>
                <p style="font-size: 16px;">Thank you for reaching out to us. We have received your message and will get back to you as soon as possible.</p>
                <p style="font-size: 16px;">Here are the details you provided:</p>
                <table style="width: 100%; font-size: 16px; border-collapse: collapse;">
                    <tr style="background-color: #f9f9f9;">
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
                    </tr>
                    <tr style="background-color: #f9f9f9;">
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject || 'No Subject'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Message:</strong></td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${message}</td>
                    </tr>
                </table>
                <p style="font-size: 16px; margin-top: 20px;">Best regards,<br><strong>Your Website Team</strong></p>
                <p style="text-align: center; font-size: 12px; color: #999; margin-top: 20px;">This email was automatically generated. Please do not reply.</p>
            </div>
        `,
    };

    try {
        // Send email to the website owner
        await transporter.sendMail(ownerMailOptions);

        // Send confirmation email to the user
        await transporter.sendMail(userMailOptions);

        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
