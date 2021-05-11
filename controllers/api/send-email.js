const nodemailer = require('nodemailer');
require('dotenv').config();
const {User} = require('../../models');
const bcrypt = require('bcrypt');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const sendEmail = async () => {
    const userRaw = await User.findByPk(4)
    const user = userRaw.get({ plain: true })
    console.log('>>> user data : ', user);

let mailOption = {
    from: 'bill.reminder.project@gmail.com',
    to: [user.email],
    subject: 'Upcoming Bill Due!',
    text: `Is this working?`,
};


transporter.sendMail(mailOption, function (err, data) {
    if(err) {
        console.log(err);
    }else {
        console.log('Email sent: ' + data.response)
    }
});
}
// sendEmail();
// const emailselector = async () => {
    
// }

module.exports = sendEmail;