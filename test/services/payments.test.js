'use strict'

const mojomock = require('../mojomock')

describe('Test suite for payments service', () => {
    test('CREATE: Payment request', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojo.payments.createRequest({
                    amount : '10',
                    purpose : 'Jest Integration Testing',
                })
                .then(res => {
                    expect(res.status).toEqual(201)
                    expect(res.data).toEqual(expect.objectContaining({
                        id : expect.any(String),
                    }))
                })
            })
    })

    test('GET: Payment request', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojo.payments.createRequest({
                    amount : '10',
                    purpose : 'Jest Integration Testing'
                })
                .then(res => {
                    return mojo.payments.getRequest({request_id:res.data.id})
                        .then(res => {
                            expect(res.status).toEqual(200)
                            expect(res.data).toEqual(expect.objectContaining({
                                id : expect.any(String),
                            }))
                        })
                })
            })
    })

    test('GET: Payment Detail', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojo.payments.getDetails({payment_id:'MOJO0223H05N30697654'})
                    .then(res => {
                        expect(res.status).toEqual(200)
                        expect(res.data).toEqual(expect.objectContaining({
                            id : expect.any(String)
                        }))
                    })
            })
    })

    test('CREATE: Payment Refund', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let params = {
                    payment_id : 'MOJO0223H05N30697654',
                    type : 'TNR', 
                    refund_amount : '1', 
                    transaction_id: Math.random().toString(36).substring(2, 15), 
                    body : 'test refund'
                }
                return mojo.payments.refund(params)
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
    })
})