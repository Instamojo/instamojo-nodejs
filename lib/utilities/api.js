'use strict'

const os = require('os')
const axios = require('axios')
const form = require('./form')
const nodeify = require('./nodeify')
const pkg = require('../../package.json')

class API {
    constructor(options) {
        this.axios = axios.create({
            baseURL : options.baseUrl,
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': `${pkg.name}/${pkg.version} ${os.platform()}/${os.release()} node/${process.version}`
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
                `${params.url}?${form(params.data)}`
            ),
            cb
        )
    }
}

module.exports = API