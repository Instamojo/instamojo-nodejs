'use strict'

class InvalidParamsError extends Error {
    
    constructor(message) {
        super(message)
        this.message = message
        Error.captureStackTrace(this, InvalidParamsError)
    }

}

module.exports = InvalidParamsError