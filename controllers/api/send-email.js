const nodemailer = require('nodemailer');
const cron = require('node-cron');
require('dotenv').config();
const { User, Bill } = require('../../models');



const emailSender = async () => {


    // const allUsers = (JSON.stringify(users.map((u) =>{
    //     return u.email;
    //     }), null, 2));
    //console.log("All users:", JSON.stringify(users, null, 2))

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "bill.reminder.project@gmail.com",
            pass: "fleetwoodmac"
        }
    })
    cron.schedule("* * */7 * * *",async () => {
       
        const usersRaw = await User.findAll({
            attributes: ['email', 'name'],
            include: [{model: Bill}]
        });
        const users = usersRaw.map( u => u.get({plain: true}))
        //console.log("sending email", allUsers);
        users.forEach( async (u) => {
            let mailOptions = {
                from: "Bill Reminder <bill.reminder.project@gmail.com>",
                to: u.email,
                subject: "Bill Reminder",
                //text: `Hi ${u.name},\nYou have a bill to pay!`,
                html: `<h1>Hi ${u.name},</h1><br>
                \n</h3>You have ${u.bills.length} bill(s) due this week!</h3<br>
                \n<ol>${u.bills.map( b => '<li>Your ' + b.name + ' bill is due on ' + b.due_date + ' for the amount of $' + b.bill_amount + '.</li>').join('')}</ol>`
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
    })
}

module.exports = emailSender;
