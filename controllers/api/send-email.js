const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();
const { User } = require('../../models');
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
const emailSender = async () => {
    const userRaw = await User.findByPk(2)
    const user = userRaw.get({ plain: true })
    console.log('>>> user data : ', user);
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    cron.schedule("*/10 * * * * *", () => {
        console.log("sending email")
        let mailOptions = {
            from: "bill.reminder.project@gmail.com",
            to: [user.email],
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
}
module.exports = emailSender;