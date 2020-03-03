'use strict'

const nodeify = function(promise, cb) {
    if (typeof cb != 'function') {
        return promise
    }

    return promise.then((response) => {
        cb(null, response)
    }).catch((error) => {
        cb(error, null)
    })
}

module.exports = nodeify