const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const { PASSWORD_META } = process.env;

const sendEmail = async ({ to, subject, html, text = '' }) => {
  const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'powerpulse7goit@meta.ua',
      pass: PASSWORD_META,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const email = {
    from: 'powerpulse7goit@meta.ua',
    to,
    subject,
    html,
    text,
  };

  await transporter.sendMail(email);
};

module.exports = sendEmail;
