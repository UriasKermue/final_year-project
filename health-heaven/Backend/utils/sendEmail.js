const nodemailer = require('nodemailer');
require('dotenv').config(); // Automatically load environment variables

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Sender email
    pass: process.env.EMAIL_PASS, // Email password or app password
  },
});

// Email sending function
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    
    // Log success message along with the response from the email service
    console.log(`Email sent successfully to ${to}. Message ID: ${info.messageId}`);
  } catch (error) {
    // Log detailed error for troubleshooting
    console.error('Error sending email:', error);
    if (error.response) {
      console.error('SMTP Server Response:', error.response);
    }
  }
};

module.exports = sendEmail;
