'use strict'

module.exports = function(api, options) {
    return {

        /**
         * Fetch access token for the client
         * @param {Function} cb
         */
        access : function(cb) {
            return api.post({
                url : '/oauth2/token/',
                data : {
                    'grant_type' : 'client_credentials',
                    client_id : options.client_id,
                    client_secret : options.client_secret,
                }
            }, cb)
        }
    }
}