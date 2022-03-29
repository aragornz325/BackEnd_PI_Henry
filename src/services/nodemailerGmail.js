const nodemailer = require('nodemailer');
require("dotenv").config();
const { USER_NODEMAIL, PASS_NODEMAIL } = process.env;

 const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: 'rodrigo.m.quintero@gmail.com', 
      pass: 'jheozwbuniznktxl', 
    },
  });

  transporter.verify().then(() => {
      console.log('Preparado para enviar email')
  })

  module.exports={
    transporter
  }