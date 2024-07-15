const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'mail.emeraldhotel.com',
    port: 587,
    secure: false,
       auth: {
            user: process.env.MAIL_SENDER_ADMIN,
            pass: process.env.MAIL_SECRETKET
         },
})

module.exports = transporter



