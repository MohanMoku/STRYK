import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    auth: {
        user: "shopstryk@gmail.com",
        pass: "kgowqafakmzhggaz",
    },
});

export const mailToUser = async (to, subject, html) => {
    try {

        const info = await transporter.sendMail({
            from: "shopstryk@gmail.com",
            to,
            subject,
            html
        });
        console.log("✅ Message sent:", info.messageId);
    } catch (err) {

        console.error("❌ Error sending mail:", err);
    }
};