'use strict';
const {
    logger,
    formatHTTPLoggerResponse,
} = require('../services/logger/loggerService');

const loggerMiddleware = (req, res, next) => {
    const originalSend = res.send;
    let responseSent = false;
    const requestStartTime = Date.now();
    res.send = function (body) {
        if (!responseSent) {
            if (res.statusCode < 400) {
                logger.info(
                    body.message,
                    formatHTTPLoggerResponse(req, res, body, requestStartTime)
                );
            } else {
                logger.error(
                    body.message,
                    formatHTTPLoggerResponse(req, res, body, requestStartTime)
                );
            }
            responseSent = true;
        }

        return originalSend.call(this, body);
    };
    next();
};

module.exports = loggerMiddleware;
