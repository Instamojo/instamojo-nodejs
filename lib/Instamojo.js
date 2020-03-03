'use strict'

const config = require('./config/settings')
const API = require('./utilities/api')

class Instamojo
{
    /**
     * Initialize Instamojo's Objt id ect
     * @param {Object} options 
     */
    constructor(options = {}) {
        // save the options for global access
        this.options = options
        this.api = new API({
            baseUrl : options.sandbox 
                ? config.sandbox.base_url 
                : config.prod.base_url,
        })

        // load all of the services
        this.loadServices()
    }

    async authenticate() {
        let data = await this.auth.access()
        this.access_token = data.data.access_token
        this.api.setHeader('Authorization', `Bearer ${this.access_token}`)
        return this
    }

    /**
     * Initialize all services
     */
    loadServices() {
        Object.assign(this, {
            auth : require('./services/auth')(this.api, this.options),
            orders : require('./services/orders')(this.api, this.options),
            refunds : require('./services/refunds')(this.api, this.options),
            payments : require('./services/payments')(this.api, this.options),
        })
    }
}

module.exports = Instamojo