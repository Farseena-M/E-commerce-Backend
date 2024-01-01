class customError extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;
        this.status = statuscode >= 400 &&  statuscode < 500 ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = customError;