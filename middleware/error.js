const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    // console.log(err);

    let error = {...err};
    error.message = err.message

    if(err.name === 'CastError'){
        const message = `User not found with id :${err.value}`;
        error = new ErrorResponse(message, 404)
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error' 
    })
}

module.exports = errorHandler;