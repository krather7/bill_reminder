const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();
const { User, Bill } = require('../../models');

// THIS CODE WORKS //
// const userRaw = await User.findByPk(1)
// const user = userRaw.get({ plain: true })
// console.log('>>> user data : ', user);
// to: [user.email],

const emailSender = async () => {

    const users = await User.findAll();
    const allUsers = (JSON.stringify(users, null, 2));

    const bills = await Bill.findAll({
        include: [
            {
                model: User,
                attributes: ['name']
            },
        ],
    });
    const billData = (JSON.stringify(bills, null, 2));

    console.log("All users:", billData)



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
            to: allUsers,
            subject: "Nodemailer",
            text: billData,
            //html: "<h1>Testing Nodemailer</h1>"
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