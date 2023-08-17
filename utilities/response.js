const status = require('http-status');

const success = (
    res,
    message = 'Operation successful',
    statusCode = status.OK,
    body = {}
) => {
    return res.status(statusCode).json({ message, ...body });
};

const error = (
    res,
    statusCode = status.BAD_REQUEST,
    message = 'Operation failed',
    body = {}
) => {
    return res.status(statusCode).json({ message, ...body });
};

const fatal = (
    res,
    statusCode = status.INTERNAL_SERVER_ERROR,
    message = 'Oops, something went wrong',
    body = {},
    error,
    stack
) => {
    return res.status(statusCode).send({ message, ...body, error, stack });
};

module.exports = { success, error, fatal };
