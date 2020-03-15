'use strict'

const mojomock = require('../mojomock')

describe('Test suite for refunds service', () => {
    test('CREATE: Payment Refund', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let params = {
                    payment_id : 'MOJO0303V05N12867792',
                    type : 'TNR', 
                    refund_amount : '1', 
                    transaction_id: Math.random().toString(36).substring(2, 15), 
                    body : 'test refund'
                }
                return mojo.refunds.create(params)
                    .then(res => {
                        expect(res.status).toEqual(201)
                        expect(res.data).toEqual(expect.objectContaining({
                            success : true,
                            refund : expect.objectContaining({
                                id : expect.any(String),
                                payment_id : expect.any(String),
                                status : expect.any(String),
                            })
                        }))
                    })
            })
    }),

    test('GET: Refunds list', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let params = { limit : 2, page : 1}
                return mojo.refunds.list(params)
                    .then(res => {
                        expect(res.status).toEqual(200)
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            })
    }),

    test('GET: Refund Detail', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let params = { id : 'R0312ONS85032' }
                return mojo.refunds.getDetail(params)
                    .then(res => {
                        expect(res.status).toEqual(200)
                    })
            })
    })
})