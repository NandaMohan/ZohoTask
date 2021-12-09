(async () => {
    // using appendFile.
    const fsp = require('fs').promises;
    await fsp.appendFile(
      '/path/to/file', '\r\nHello world.'
    );
  
    // using apickfs; handles error and edge cases better.
    const apickFileStorage = require('apickfs');
    await apickFileStorage.writeLines(
      '/path/to/directory/', 'filename', 'Hello world.'
    );
  })();

  var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});