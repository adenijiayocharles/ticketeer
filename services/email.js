'use strict';
require('dotenv').config;
const nodemailer = require('nodemailer');
const nodemailerMg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
const auth = {
    auth: {
        api_key: process.env.NODEMAILER_API_KEY,
        domain: process.env.NODEMAILER_DOMAIN,
    },
};

const nodemailerMailgun = nodemailer.createTransport(nodemailerMg(auth));

const sendEmail = async (payload) => {
    try {
        const email = await nodemailerMailgun.sendMail({
            from: process.env.NODEMAILER_FROM,
            to: payload.recipient,
            subject: payload.subject,
            text: payload.text,
        });
        return email.status;
    } catch (error) {
        console.log('error', error);
    }
};

module.exports = { sendEmail };
