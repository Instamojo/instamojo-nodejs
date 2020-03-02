'use strict'

const mojomock = require('../mojomock')

describe('Test suite for payments service', () => {
    test('CREATE: Payment request', () => {
        return mojomock.authenticate()
            .then(mojo => {
                return mojomock.payments.createRequest({
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
                return mojomock.payments.createRequest({
                    amount : '10',
                    purpose : 'Jest Integration Testing'
                })
                .then(res => {
                    return mojomock.payments.getRequest({id:res.data.id})
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
                return mojo.payments.getDetails({id:'MOJO0223H05N30697654'})
                    .then(res => {
                        expect(res.status).toEqual(200)
                        expect(res.data).toEqual(expect.objectContaining({
                            id : expect.any(String)
                        }))
                    })
            })
    })
})