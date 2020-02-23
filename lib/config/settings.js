'use strict'

const config = {
    prod : {
        base_url : 'https://api.instamojo.com/'
    },

    sandbox : {
        base_url : 'https://test.instamojo.com/'
    },

    payments : {
        create_request_url : '/v2/payment_requests/',
        get_request_url : '/v2/payment_requests',
        get_details_url : '/v2/payments/',
    }
}

module.exports = config