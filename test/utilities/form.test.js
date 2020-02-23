'use strict'

const form = require('../../lib/utilities/form')
const InvalidParamsError = require('../../lib/errors/invalidParamsError')

describe('Test suite for form data utility', () => {

    test('When object is passed', () => {
        let data = { key1 : 'value1', key2 : 'value2', }
        let response = form(data)
        expect(typeof response).toBe('string')
    })

    test('When non-object value is passed', () => {
        let data = 'key1=value2'
        let func = function() {
            form(data)
        }
        expect(func).toThrowError(InvalidParamsError)
    })
    
})