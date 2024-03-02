const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const { PASSWORD_META } = process.env;

export const sendEmail = async ({ to, subject, html, text = '' }) => {
  const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'nodejsgoittest@meta.ua',
      pass: PASSWORD_META,
    },
  };

  const transporter = nodemailer.createTransport(config);

  const email = {
    from: 'nodejsgoittest@meta.ua',
    to,
    subject,
    html,
    text,
  };

  await transporter.sendMail(email);
};
