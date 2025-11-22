import Ship from './ship.js'

const battleship = new Ship(4)

beforeEach(() => battleship.hit())

test('Ship has correct length', () => expect(battleship.length).toBe(4))
test('Ship has taken 2 damage', () => expect(battleship.hits).toBe(2))
test('Ship has taken 3 damage', () => expect(battleship.hits).toBe(3))
test('Ship is sunk', () => expect(battleship.isSunk()).toBe(true))