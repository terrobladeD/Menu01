const express = require('express');
const router = express.Router();
const sendEmail = require('../others/emailer');

router.post('/send-email', async (req, res) => {
    const { to, subject, text, html } = {
        "to": "terrobladediao@gmail.com",
        "subject": "Hello",
        "text": "Hello, this is a test email!",
        "html": "<b>Hello, this is a test email!</b>"
    };

    try {
        await sendEmail({ to, subject, text, html });
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        res.status(500).send('Error occurred while sending email');
    }
});

module.exports = router;
