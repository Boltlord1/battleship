import Ship from './ship.js'
import Gameboard from './gameboard.js'
import getPositions from './positions.js'

test('Ships can be sunk', () => {
    const board = Gameboard()
    board.placeShip(getPositions([0, 0], 3))
    board.receiveAttack([0, 0])
    board.receiveAttack([1, 0])
    board.receiveAttack([2, 0])
    expect(board.sunkAt([0, 0])).toBe(true)
})

test('allSunk returns false when ships are not sunk', () => {
    const board = Gameboard()
    board.placeShip(getPositions([0, 0], 3))
    board.placeShip(getPositions([9, 9], 3))
    board.receiveAttack([0, 0])
    board.receiveAttack([1, 0])
    board.receiveAttack([2, 0])
    expect(board.sunkAt([0, 0])).toBe(true)
    expect(board.allSunk()).toBe(false)
})

test('allSunk returns true when ships are sunk', () => {
    const board = Gameboard()
    board.placeShip(getPositions([0, 0], 3))
    board.receiveAttack([0, 0])
    board.receiveAttack([1, 0])
    board.receiveAttack([2, 0])
    expect(board.allSunk()).toBe(true)
})