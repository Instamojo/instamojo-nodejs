'use strict'

const { refunds } = require('../config/settings')

module.exports = function(api, options) {
    return {
        /**
         * Create a payment refund
         * @param {Object} params
         * @param {Function} cb
         */
        create : function(params, cb) {
            return api.post({
                url : `/v2/payments/${params.payment_id}/refund/`,
                data : params
            }, cb)
        },

        /**
         * Get list of refunds
         * @param {Object} params
         * @param {Function} cb
         */
        list : function(params, cb) {
            return api.get({
                url : `${refunds.base_url}/`,
                data : params
            }, cb)
        },

        /**
         * Get refund detail
         * @param {Object} params
         * @param {Function} cb
         */
        getDetail : function(params, cb) {
            return api.get({
                url : `${refunds.base_url}/${params.id}/`,
                data : params
            }, cb)
        }
    }
}