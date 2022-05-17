const smtpTransport = require('nodemailer-smtp-transport')
const nodemailer = require('nodemailer')


let transporter = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,

        pass: process.env.GMAIL_PWD

    }
}));

module.exports = transporter