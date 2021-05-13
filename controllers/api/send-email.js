const nodemailer = require('nodemailer');
const cron = require('node-cron');
//require('dotenv').config();
//const {User} = require('../../models');
//const bcrypt = require('bcrypt');

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// const sendEmail = async () => {
//     const userRaw = await User.findByPk(4)
//     const user = userRaw.get({ plain: true })
//     console.log('>>> user data : ', user);

// let mailOption = {
//     from: 'bill.reminder.project@gmail.com',
//     to: [user.email],
//     subject: 'Upcoming Bill Due!',
//     text: `Is this working?`,
// };

//     cron.schedule('* * 8, * sunday', () => {

//         transporter.sendMail(mailOption, function (err, data) {
//             if(err) {
//                 console.log(err);
//             }else {
//                 console.log('Email sent: ' + data.response)
//             }
//         });
//     });
// }
// // sendEmail();
// // const emailselector = async () => {
    
// // }

// module.exports = sendEmail;

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "bill.reminder.project@gmail.com",
        pass: "fleetwoodmac"
    }
})

cron.schedule("* * * * *", () => {
    console.log("sending email")
    let mailOptions = {
        from: "bill.reminder.project@gmail.com",
        to: "samuel6roth@gmail.com",
        subject: "Nodemailer",
        text: "Testing Nodemailer",
        html: "<h1>Testing Nodemailer</h1>"
}


transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log("error occurred", err)
    } else {
        console.log("email sent", info)
    }
  })
})