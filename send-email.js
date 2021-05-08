const nodemailer = require('nodemailer');
require('dotenv').config();
// const {User} = require('./models/User');
// const bcrypt = require('bcrypt');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        // model: User,
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

let mailOption = {
    from: 'bill.reminder.project@gmail.com',
    to: 'samuel6roth@gmail.com',
    subject: 'testing',
    text: `Is this working?`,
};

transporter.sendMail(mailOption, function (err, data) {
    if(err) {
        console.log(err);
    }else {
        console.log('Email sent: ' + data.response)
    }
});