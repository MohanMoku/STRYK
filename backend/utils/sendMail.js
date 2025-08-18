import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASS,
    },
});

export const mailToUser = async (to, subject, html) => {
    try {

        const info = await transporter.sendMail({
            from: process.env.GMAIL_ID,
            to,
            subject,
            html
        });
        console.log("✅ Message sent:", info.messageId);
    } catch (err) {

        console.error("❌ Error sending mail:", err);
    }
};