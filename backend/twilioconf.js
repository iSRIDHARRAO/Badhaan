import twilio from 'twilio';

const accountSid = '<twilio-sid>'; // Your Account SID from www.twilio.com/console
const authToken = '<twilio-auth-token>'; // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

export default client;