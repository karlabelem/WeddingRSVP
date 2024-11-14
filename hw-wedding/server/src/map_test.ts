import * as assert from 'assert';
import { mutableMap, factoryFunction } from './map';

// Test cases for the methods of the map class
describe("map", function () {
    const map: mutableMap<number> = factoryFunction()
    map.setValue('bread', 7)

    it('hasKey', function () {
        // Test the function call with two tests per subdomain
        assert.deepStrictEqual(map.hasKey('bread'), true)
        assert.deepStrictEqual(map.hasKey('booga'), false)
    })

    it('getValue', function () {
        map.setValue('red', 9)
        // Test the function call with two tests per subdomain
        assert.deepStrictEqual(map.getValue('bread'), 7)
        assert.deepStrictEqual(map.getValue('red'), 9)
    })

    it('setValue', function () {
        // Two tests for return values when replacing keys
        // Two tests for object state when replacing keys
        assert.deepStrictEqual(map.setValue('bread', 23), true)
        assert.deepStrictEqual(map.getValue('bread'), 23)
        assert.deepStrictEqual(map.setValue('red', 10), true)
        assert.deepStrictEqual(map.getValue('red'), 10)

        // Two tests for return values when adding keys
        // Two tests for object state when adding keys
        assert.deepStrictEqual(map.setValue('candy', 23), false)
        assert.deepStrictEqual(map.getValue('candy'), 23)
        assert.deepStrictEqual(map.setValue('builder', 24), false)
        assert.deepStrictEqual(map.getValue('builder'), 24)
    })

    it('clearPairs', function () {
        // Two tests for object state
        map.clearPairs()
        assert.deepStrictEqual(map.hasKey('bread'), false)
        map.setValue('aiks', 7)
        map.clearPairs()
        assert.deepStrictEqual(map.hasKey('aiks'), false)
    })
    it('returnKeys', function () {
        // Two tests for each subdomain (straightline code)
        map.setValue('french toast', 4)
        assert.deepStrictEqual(map.returnKeys(), ['french toast'])
        map.setValue('research', 100)
        assert.deepStrictEqual(map.returnKeys(), ['french toast', 'research'])
    })

    it('returnValues', function () {
        // Two tests for each subdomain (straightline code)
        map.clearPairs()
        map.setValue('french toast', 4)
        assert.deepStrictEqual(map.returnValues(), [4])
        map.setValue('research', 100)
        assert.deepStrictEqual(map.returnValues(), [4, 100])
    })
})