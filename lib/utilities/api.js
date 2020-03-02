'use strict'

const axios = require('axios')
const form = require('./form')
const nodeify = require('./nodeify')

class API {
    constructor(options) {
        this.axios = axios.create({
            baseURL : options.baseUrl,
            headers : {
                'content-type': 'application/x-www-form-urlencoded',
            }
        })
    }

    setHeader(key, value) {
        this.axios.defaults.headers.common[key] = value
    }

    post(params, cb) {
        return nodeify(
            this.axios.post(
                params.url, 
                form(params.data)
            ),
            cb
        )
    }

    get(params, cb) {
        return nodeify(
            this.axios.get(
                params.url
            ),
            cb
        )
    }
}

module.exports = API