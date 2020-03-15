'use strict'

const config = {
    prod: {
        base_url: 'https://api.instamojo.com/'
    },

    sandbox: {
        base_url: 'https://test.instamojo.com/'
    },

    auth: {
        scope: 'payouts:read payments:read payments:fulfil payments:refund users:read users:write payment-requests:read payment-requests:write gateway-orders:read gateway-orders:write convenience-fee:read refunds:read'
    },

    payments: {
        create_request_url: '/v2/payment_requests/',
        get_request_url: '/v2/payment_requests',
        get_details_url: '/v2/payments/',
    },

    orders: {
        base_url: '/v2/gateway/orders'
    },

    refunds: {
        base_url: '/v2/refunds',
    }
}

module.exports = config