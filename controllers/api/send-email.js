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

    const usersRaw = await User.findAll({
        attributes: ['email', 'name'],
        include: [{model: Bill}]
    });
    const users = usersRaw.map( u => u.get({plain: true}))
    // const allUsers = (JSON.stringify(users.map((u) =>{
    //     return u.email;
    //     }), null, 2));
    //console.log("All users:", JSON.stringify(users, null, 2))



    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })
    cron.schedule("*/10 * * * * *", () => {
        //console.log("sending email", allUsers);

        users.forEach( async (u) => {
            let mailOptions = {
                from: "bill.reminder.project@gmail.com",
                to: u.email,
                subject: "Bill Remainder",
                text: `Hi ${u.name},\nYou have a bill to pay!`,
                html: `<h1>Hey ${u.name},\nYou got ${u.bills.length} bill(s).</h1><br><p>${u.bills.map( b => b.name + ', ')}</p>`
            }
            console.log('>>>>>', mailOptions)
            await transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log("error occurred", err)
                } else {
                    console.log("email sent", info)
                }
            })
        })
    //     let mailOptions = {
    //         from: "bill.reminder.project@gmail.com",
    //         to: allUsers,
    //         subject: "Nodemailer",
    //         text: "Testing Nodemailer",
    //         html: "<h1>Testing Nodemailer</h1>"
    // }
    // transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.log("error occurred", err)
    //     } else {
    //         console.log("email sent", info)
    //     }
    // })
    })
}

module.exports = emailSender;