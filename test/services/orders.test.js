'use strict'

const mojomock = require('../mojomock')

describe('Test suite for orders service', () => {
    test('CREATE: Order', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let params = {
                    name            : 'Test User',
                    email           : 'test@test.com',
                    phone           : '7777777777',
                    currency        : 'INR',
                    amount          : 100,
                    transaction_id  : Math.random().toString(36).substring(7),
                    redirect_url    : 'https://instamojo.com'
                }
                return mojo.orders.create(params)
                    .then(res => {
                        expect(res.status).toEqual(201)
                        expect(res.data).toEqual(expect.objectContaining({
                            order : expect.objectContaining({
                                id : expect.any(String),
                                transaction_id : expect.any(String),
                            })
                        }))
                    })
            })
    })

    test('CREATE: Order with already used id', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let params = {
                    name            : 'Test User',
                    email           : 'test@test.com',
                    phone           : '7777777777',
                    currency        : 'INR',
                    amount          : 100,
                    transaction_id  : '1234ewqr',
                    redirect_url    : 'https://instamojo.com'
                }
                return mojo.orders.create(params)
                    .catch(err => {
                        expect(err.status).not.toEqual(201)
                    })
            })
    })

    test('CREATE: Order for payment request', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojo.payments.createRequest({
                    amount : '100000',
                    purpose : 'Jest Integration Testing',
                })
                .then(res => {
                    return mojo.orders.createForPaymentRequest({
                        id: res.data.id,
                    }).then(res => {
                        expect(res.status).toEqual(200)
                        expect(res.data).toEqual(expect.objectContaining({
                            order_id: expect.any(String),
                        }))
                    })
                })
            })
    })

    test('GET: Order detail by id', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojo.orders.getDetail({
                    order_id : '323c748fcc704608b5c574c1c585e67f',
                }).then(res => {
                    expect(res.status).toEqual(200)
                })
            })
    })

    test('GET: List of orders', () => {
        return mojomock.authenticate()
            .then(mojo => {
                mojo.orders.list({limit:1, page:1})
                    .then(res => {
                        expect(res.status).toEqual(200)
                        expect(res.data).toEqual(expect.objectContaining({
                            orders : expect.any(Array),
                        }))
                    })
            })
    })

    test('GET: Transaction detail by id', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let transaction_id = 'MOJO0311I05N74785520'
                return mojo.orders.getTransactionDetail({transaction_id})
                    .then(res => {
                        expect(res.status).toEqual(200)
                        expect(res.data).toEqual(expect.objectContaining({
                            id      : expect.any(String),
                            transaction_id : transaction_id,
                            status : expect.any(String),
                        }))
                    })
            })
    })

    test('GET: Transaction detail by wrong id', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojo.orders.getTransactionDetail({transaction_id:'1234'})
                    .catch(error => {
                        expect(error.response.status).toEqual(404)
                    })
            })
    })
})