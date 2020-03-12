const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nguyenducthien467@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me now how you get along with the app`,
        
    })
};

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'nguyenducthien467@gmail.com',
        subject: 'Thanks for canceling!',
        text: `Welcome to the app, ${name}. Let me now how you get along with the app`,
        
    })
};


module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}