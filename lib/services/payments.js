'use strict'

const { payments } = require('../config/settings')

module.exports = function(api) {
    return {
        /**
         * Create Payment Request
         * @param {Object} params 
         * @param {Function} cb
         */
        createRequest : function(params, cb) {
            return api.post({
                url : payments.create_request_url,
                data : params,
            }, cb)
        },

        /**
         * Get Payment Request's Detail
         * @param {Object} params
         * @param {Function} cb
         */
        getRequest : function(params, cb) {
            return api.get({
                url : `${payments.get_request_url}/${params.request_id}`,
                data : params,
            }, cb)
        },

        /**
         * Get Payment Details
         * @param {Object} params
         * @param {Function} cb
         */
        getDetails : function(params, cb) {
            return api.get({
                url : `/v2/payments/${params.payment_id}`,
                data : params
            }, cb)
        },

        /**
         * List all payments.
         * @param {Object} params
         * @param {Function} cb
         */
        list : function(params, cb) {
            return api.get({
                url : `/v2/payments/`,
                data : params,
            }, cb)
        }
    }
}