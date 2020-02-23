'use strict'

const InvalidParamsError = require('../errors/invalidParamsError')

const form = function(params) {
    if (!(params instanceof Object)) {
        throw new InvalidParamsError(
            `Expected object as parameter, instead received ${typeof  params}`
        )
    }

    return Object.keys(params)
        .map(key => 
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        ).join('&')
}

module.exports = form