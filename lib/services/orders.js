'use strict'

const { orders } = require('../config/settings')

module.exports = function(api, options) {
    return {
        
        /**
         * Create a new order
         * @param {Object} params
         * @param {Function} cb
         */
        create : function(params, cb) {
            return api.post({
                url : `${orders.base_url}`,
                data : params
            }, cb)
        },

        /**
         * Create a new order for a payment request
         * @param {Object} params
         * @param {Function} cb
         */
        createForPaymentRequest : function(params, cb) {
            return api.post({
                url : `${orders.base_url}/payment-request`,
                data : params
            }, cb)
        },

        /**
         * Get Order Detail by Id
         * @param {Object} params
         * @param {Function} cb
         */
        getDetail : function(params, cb) {
            return api.get({
                url : `${orders.base_url}/id:${params.order_id}`,
                data : params
            })
        },

        /**
         * Get Orders list
         * @param {Object} params
         * @param {Function} cb
         */
        list : function(params, cb) {
            return api.get({
                url : orders.base_url,
                data : params
            })
        },

        /**
         * Get transaction detail by id
         * @param {Object} params
         * @param {Function} cb
         */
        getTransactionDetail : function(params, cb) {
            return api.get({
                url : `${orders.base_url}/transaction_id:${params.transaction_id}/`,
                data : params
            })
        }
    }
}