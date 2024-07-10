const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendReferralEmail } = require('../utils/email');


const createReferral = async (req, res) => {
    const { referrerName, referrerEmail, refereeName, refereeEmail } = req.body;

    try {
      
        const referral = await prisma.referral.create({
            data: {
                referee: refereeName,
                referrer: referrerName
            }
        });

        if (!referral) {
            return res.status(400).json({
                status: 'failure',
                code: 400,
                message: 'Referral not created',
            });
        }

        // Send email
        const emailInfo = await sendReferralEmail(referrerName, referrerEmail, refereeName, refereeEmail);

        if (!emailInfo) {
            return res.status(400).json({
                status: 'failure',
                code: 400,
                message: 'Email not sent',
                data:[]
            });
        }

        res.status(200).json({
            status: 'success',
            code: 200,
            message: 'Referral created and email sent successfully',
            data:emailInfo
        });
    } catch (error) {
        console.error('Error creating referral:', error);
        return res.status(500).json({ error: 'Failed to create referral' });
    }
};

module.exports = {
    createReferral,
};
