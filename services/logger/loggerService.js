'use strict';
require('dotenv').config;
const winston = require('winston');
const { combine, timestamp, json, printf } = winston.format;
const { generateRandomId } = require('../../utilities/general');
const redacted = require('./redacted');

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

const redactLogData = (data) => {
    if (
        typeof data === 'object' &&
        data !== null &&
        !data.constructor.name.startsWith('model')
    ) {
        if (Array.isArray(data)) {
            return data.map((item) => redactLogData(item));
        }

        const redactedData = {};

        for (const key in data) {
            if (redacted.includes(key)) {
                redactedData[key] = '***************';
            } else {
                redactedData[key] = redactLogData(data[key]);
            }
        }

        return redactedData;
    } else {
        return data;
    }
};

const formatHTTPLoggerResponse = (req, res, responseBody, requestStartTime) => {
    let requestDuration = '';
    if (requestStartTime) {
        const endTime = Date.now() - requestStartTime;
        requestDuration = `${endTime / 1000}s`; // ms to s
    }
    return {
        request: {
            headers: req.headers,
            host: req.headers.host,
            baseUrl: req.baseUrl,
            url: req.url,
            method: req.method,
            body: redactLogData(req.body),
            params: req?.params,
            query: req?.query,
            clientIp: req?.socket.remoteAddress,
        },
        response: {
            headers: res.getHeaders(),
            statusCode: res.statusCode,
            requestDuration,
            body: redactLogData(responseBody),
        },
    };
};

module.exports = { logger, formatHTTPLoggerResponse };
