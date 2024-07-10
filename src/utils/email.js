const nodemailer = require('nodemailer');

async function sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail) {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log('Credentials obtained, sending message...');

        let message = {
            from: `"Sender Name" <${process.env.EMAIL_USER}>`,
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
