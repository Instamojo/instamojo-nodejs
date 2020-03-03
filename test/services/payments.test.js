'use strict'

const mojomock = require('../mojomock')

describe('Test suite for payments service', () => {
    test('CREATE: Payment request', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojo.payments.createRequest({
                    amount : '100000',
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
    
    test('GET: list of payments', () => {
        return mojomock.authenticate()
            .then(mojo => {
                let params = {
                    limit : 1,
                    page  : 1,
                }
                return mojo.payments.list(params)
                    .then(res => {
                        expect(res.status).toEqual(200)
                        expect(res.data).toEqual(expect.objectContaining({
                            count : expect.any(Number),
                            payments : expect.any(Array)
                        }))

                        res.data.payments.forEach(_p => {
                            expect(_p).toEqual(expect.objectContaining({
                                id : expect.any(String),
                                title : expect.any(String),
                                payment_type : expect.any(String),
                                status : expect.any(Boolean),
                            }))
                        })
                    })
            })
    })
})