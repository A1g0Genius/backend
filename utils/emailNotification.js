const nodemailer = require('nodemailer')
require('dotenv').config()
const emailNotification = async (student, teacher) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
    });

    const mailOptions = {
        from: 'random@gmail.com',
        to: student.email,
        subject: 'Assignment Alert',
        html: `<h2>New Assignment had been Added by ${teacher.name}</h2>`,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = emailNotification