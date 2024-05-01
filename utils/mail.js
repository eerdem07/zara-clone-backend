const nodemailer = require("nodemailer");

const sendMail = (to, subject, text, html) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: "pacshakur502@gmail.com",
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
      throw new Error(error);
    } else {
      return;
    }
  });
};

module.exports = sendMail;
