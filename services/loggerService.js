'use strict';
require('dotenv').config;
const winston = require('winston');
const { combine, timestamp, json, printf } = winston.format;
const { generateRandomId } = require('../utilities/general');

const appVersion = process.env.npm_package_version;

const logger = winston.createLogger({
    format: combine(
        timestamp({ format: 'YYYY-MMM-DD HH:mm:ss' }),
        json(),
        printf(({ timestamp, level, message, ...data }) => {
            const response = {
                level,
                logId: generateRandomId(),
                timestamp,
                appInfo: {
                    appVersion,
                    environment: process.env.NODE_ENV,
                    proccessId: process.pid,
                },
                message,
                data,
            };

            return JSON.stringify(response, null, 2);
        })
    ),
    transports: [new winston.transports.Console()],
});

const formatHTTPLoggerResponse = (req, res, responseBody) => {
    return {
        request: {
            headers: req.headers,
            host: req.headers.host,
            baseUrl: req.baseUrl,
            url: req.url,
            method: req.method,
            body: req.body,
            params: req?.params,
            query: req?.query,
            clientIp: req?.socket.remoteAddress,
        },
        response: {
            headers: res.getHeaders(),
            statusCode: res.statusCode,
            body: responseBody,
        },
    };
};

module.exports = { logger, formatHTTPLoggerResponse };
