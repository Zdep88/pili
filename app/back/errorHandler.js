const httpErrorDictionnary = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
}

const errorHandler = {

    throw(status, message = "") {
        const error = new Error(message);
        error.status = status;
        throw error;
    },

    notFound(req, res, next) {
        errorHandler.throw(404);
    },

    catch: (err, req, res, next) => {
        if (!err.status) {
            console.error("Error without status :");
            console.error(err);
            err.status = 500;
            err.message = httpErrorDictionnary[500];
        }
        if (!err.message) {
            err.message = httpErrorDictionnary[err.status] || 'An unexpected error occurred';
        }
        res.status(err.status).json({
            status: err.status,
            error: err.message,
        })
    },
}

export default errorHandler;