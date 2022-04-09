require('dotenv').config()

const express = require('express');
const cors = require('cors');

const mailgun = require("mailgun-js");

const API_KEY = process.env.API_KEY;
const DOMAIN = process.env.DOMAIN;

const client = mailgun({apiKey: API_KEY, domain: DOMAIN, host:'api.eu.mailgun.net', protocol: 'https:'});
const app = express();

//allow cors from localhost 3000
app.use(cors({
    origin: "*",
    credentials: true
}));

//parse json
app.use(express.json());

const port = process.env.PORT || 3001;

//receive messageData from portfolio and send it to mailgun
app.post('/send', (req:any, res:any) => {
    const { name, email, message } = req.body;

    const data = {
        from: `${name}, ${email}`,
        to: 'girts@gkarcevskis.com',
        subject: 'Portfolio message',
        text: message
    };

    client.messages().send(data, function (error:string, body:string) {
        console.log('body: ',body);
        if(error){
            console.log('error: ',error);
            res.json({
                status: 418,
                sent: false,
                message: error
            })
        }else{
            res.json({
                status: 200,
                sent: true
            })
        }
    });


});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
