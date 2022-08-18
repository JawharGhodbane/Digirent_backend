const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: "Gmail",
  pool: true,
    port: 465 ,
    ignoreTLS: true,
    secure: false,
    logger: true, // log to console
    debug: true, // include SMTP traffic in the logs
    auth: {
    user: process.env.USER,
    pass: process.env.PASS
  },
});

module.exports = transport;