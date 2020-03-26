'use strict'

const mojomock = require('../mojomock')

describe('Test suite for auth service', () => {
    
    test('Fetch token', () => {
        return mojomock.auth.access()
        .then(res => {
            expect(res.data)
                .toEqual(expect.objectContaining({
                    access_token : expect.any(String),
                    expires_in : expect.any(Number),
                    token_type : 'Bearer',
                    scope : expect.any(String)
                }))
        })
    })

    test('Invalid Credentials', () => {
        return mojomock.auth.access()
            .catch(err => {
                expect(err.response.status)
                    .toEqual(401)
                expect(err.response.data)
                    .toEqual(expect.objectContaining({
                        error : expect.any(String)
                    }))
            })
    })
})