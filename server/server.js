const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

const accountSid = 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = 'YOUR_TWILIO_AUTH_TOKEN';
const twilioPhoneNumber = 'YOUR_TWILIO_PHONE_NUMBER';

const client = twilio(accountSid, authToken);

app.use(cors());
app.use(bodyParser.json());

app.post('/send-sms', (req, res) => {
    const { phoneNumber, message } = req.body;

    client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber
    })
        .then(message => {
            console.log('Message sent:', message.sid);
            res.status(200).json({ success: true, message: 'Message sent', sid: message.sid });
        })
        .catch(error => {
            console.error('Error sending message:', error);
            res.status(500).json({ success: false, message: 'Failed to send message', error });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
