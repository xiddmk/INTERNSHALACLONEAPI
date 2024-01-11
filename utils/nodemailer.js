const nodemailer = require("nodemailer");
const ErrorHandler = require("./ErrorHandler");

exports.sendmail = (req, res, next, url) => {

    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        post: 465, // It should be "port" instead of "post"
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    const mailOption = {
        from: "xidd",
        to: req.body.email,
        subject: "password reset link",
        html: `
        <h1>
        click link to reset password
        </h1>
        <a href="${url}">password reset link </a>
        `
    };

    transport.sendMail(mailOption, (err, info) => {
        if (err) return next(new ErrorHandler(err, 500));
        console.log(info);

        return res.status(200).json({
            message: "mail sent", // Corrected "massage" to "message"
            url,
        });
    });
};
