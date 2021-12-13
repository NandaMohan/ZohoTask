var nodemailer = require('nodemailer');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nanda26dmk@gmail.com',
    pass: 'Nanda@123'
  }
});

var mailOptions = {
  from: 'nanda26dmk@gmail.com',
  to: 'ngm7454@gmail.com',
  subject: 'Gold rate - TODAY',
  text: 'GOLD RATE INCREASED!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = transporter.sendMail