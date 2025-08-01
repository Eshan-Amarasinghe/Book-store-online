const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Online Bookstore" <${process.env.EMAIL_USER}>`,
      to,
      subject : 'Welcome to Online Bookstore – Please Confirm Your Email',
      html
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully!');
    console.log('👉 SMTP response:', info.response);
  } catch (error) {
    console.error('❌ Email sending failed!');
    console.error(error);
    throw error; 
  }
};

module.exports = sendEmail;
