const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: '',
    auth: {
        user: '',
        password: ''
    }
});

let mailOption = {
    from: '',
    to: '',
    subject: '',
    text: ``,
};

transporter.sendMail(mailOption, function (err, info) {
    if(err) {
        console.log(err);
    }else {
        console.log('Email sent: ' + info.response)
    }
});