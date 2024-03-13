const dotenv = require('dotenv');

dotenv.config();
const { FRONTEND_URL } = process.env;
const url = FRONTEND_URL || 'localhost:3000';

const generateVerifyMessage = verificationToken =>
  `<html>
      <head>
        <style>
          body {
            font-size: 24px;
          }
          .container {
            max-width: 70%;
            margin: 0 auto;
            padding: 20px;
            background: #040404;
            font-family: "Cormorant Garamond", serif;
            border-radius: 12px;
            border: 1px solid rgba(239, 237, 232, 0.20);
            }
          h2 {
            font-size: 28px;
            margin-bottom: 10px;
            text-align: center;
            color: #E6533C;
          }
          a{
            display: block;
            font-size: 20px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class='container'>
          <h2>Hello from Backend, here\`s you verify link 👇️️️️️️</h2>
          <br />
          <a target="_blank" href="http://${url}/?verificationToken=${verificationToken}">Click for verify email</a>
        </div>
      </body>
    </html>`;

module.exports = generateVerifyMessage;
