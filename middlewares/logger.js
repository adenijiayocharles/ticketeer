'use strict';
const {
    logger,
    formatHTTPLoggerResponse,
} = require('../services/logger/loggerService');

const loggerMiddleware = (req, res, next) => {
    const originalSend = res.send;
    let responseSent = false;
    res.send = function (body) {
        if (!responseSent) {
            if (res.statusCode < 400) {
                logger.info(
                    'Some Success message',
                    formatHTTPLoggerResponse(req, res, body)
                );
            } else {
                logger.error(
                    body.message,
                    formatHTTPLoggerResponse(req, res, body)
                );
            }
            responseSent = true;
        }

        return originalSend.call(this, body);
    };
    next();
};

module.exports = loggerMiddleware;
