const status = require('http-status');
/**
 * Class for methods relating to generating http responses
 */
class Response {
    /**
     * Method for successful operations - requires an object of the response object, http status code, status message and response code
     */
    static success(
        res,
        message = 'Operation successful',
        statusCode = status.OK,
        body = {}
    ) {
        return res.status(statusCode).json({ message, ...body });
    }

    /**
     * Method for failed operations - requires an object of the response object, http status code, status message and response code
     */
    static error(
        res,
        statusCode = status.BAD_REQUEST,
        message = 'Operation failed',
        body = {}
    ) {
        return res.status(statusCode).json({ message, ...body });
    }

    /**
     * Method for fatal operations - requires an Object of the response object, http status code, status message and response code
     */
    static fatal(
        res,
        statusCode = status.INTERNAL_SERVER_ERROR,
        message = 'Oops, something went wrong',
        body = {},
        error,
        stack
    ) {
        return res.status(statusCode).send({ message, ...body, error, stack });
    }
}

module.exports = Response;
