const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Replace with your SMTP provider's domain
    port: 587,
    secure: false,
    auth: {
      user: 'blade@johnbatman.com.au', // Replace with your email
      pass: 'GothicOlive116', // Replace with your email password
    },
  });

  const mailOptions = {
    from: 'blade@johnbatman.com.au', // Replace with your email
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error occurred while sending email: %s', error.message);
  }
}

module.exports = sendEmail;
