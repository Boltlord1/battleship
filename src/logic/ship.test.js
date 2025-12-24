import Ship from './ship.js'

const patrol = Ship(2)
beforeEach(() => patrol.hit())

test('Ship is not sunk', () => expect(patrol.isSunk()).toBe(false))
test('Ship is sunk', () => expect(patrol.isSunk()).toBe(true))