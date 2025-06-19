import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config();
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
export async function sendMessage(to, body) {
    
    try {
        const message = await twilioClient.messages.create({
        body: body,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to
        });
        return message;
    } catch (error) {
        console.error('Error sending message:', error);
        throw new Error('Failed to send message');
    }
}


export const makePhoneCall = async (to) => {
    try {
        const call = await twilioClient.calls.create({
            to: to,
            from: process.env.TWILIO_PHONE_NUMBER,
            twiml: `<Response voice='man'><Say>Hello Good morning, I wanted to check if sending messages with twilio could work</Say></Response>`
        });
        return call;
    } catch (error) {
        console.error('Error making phone call:', error);
        throw new Error('Failed to make phone call');
    }
}