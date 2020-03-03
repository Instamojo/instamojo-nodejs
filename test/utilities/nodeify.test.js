'use strict'

const nodeify = require('../../lib/utilities/nodeify')

describe('Test suite for nodefying utility', () => {

    test('If callback is not passed', () => {
        let data = 'Some Test Data'
        expect(Promise.resolve(data))
            .toBeInstanceOf(Promise)
    })

    test('Check if resolved', () => {
        let data = 'Some Test Data'
        nodeify(Promise.resolve(data), (err, res) => {
            expect(res).toEqual(data)
            expect(err).toEqual(null)
        })
    })

    test('Check if rejected', () => {
        let error = 'Some Error Message'
        nodeify(Promise.reject(error), (err, res) => {
            expect(err).toEqual(error)
            expect(res).toEqual(null)
        })
    })

})