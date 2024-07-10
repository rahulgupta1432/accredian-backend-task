const nodemailer = require('nodemailer');

async function sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail) {
    try {
        const account = await nodemailer.createTestAccount();

        console.log('Credentials obtained, sending message...');

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure:false,
            // secure: account.smtp.secure,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log("EMAIL_USER",process.env.EMAIL_USER);
        let message = {
            from:`Sender I'd ${process.env.EMAIL_USER}`,
            to: refereeEmail,
            subject: 'Referral Invitation',
            text: `${referrerName} has referred you to join our platform.`,
            html: `<p>${referrerName} has referred you to join our platform.</p>`
        };
    
    
        let info = await transporter.sendMail(message);

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        return info;
    } catch (error) {
        console.error('Failed to send referral email. ' + error.message);
        throw error;
    }
}

module.exports = { sendReferralEmail };
