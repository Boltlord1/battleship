import Ship from '../ship/ship.js'
import Gameboard from './gameboard.js'

const board = new Gameboard()
board.placeShip(4, 4, 4)
board.placeShip(5, 6, 6)
board.placeShip(3, 2, 2, true)
board.placeShip(5, 1, 8, true)
board.receiveAttack(4, 4)
board.receiveAttack(2, 2)
board.receiveAttack(2, 3)
board.receiveAttack(2, 4)
board.receiveAttack(3, 9)

const sunk = new Gameboard()
sunk.placeShip(1, 1, 1)
sunk.placeShip(1, 2, 2)
sunk.receiveAttack(1, 1)
sunk.receiveAttack(2, 2)

test('Gameboard is 10x10', () => {
    expect(board.board.length).toBe(10)
    for (const y of board.board) {
        expect(y.length).toBe(10)
    }
})

test('Ship is placed from (4,4) to (7,4)', () => {
    expect(board.board[4][4]).toBeInstanceOf(Ship)
    expect(board.board[4][5]).toBeInstanceOf(Ship)
    expect(board.board[4][6]).toBeInstanceOf(Ship)
    expect(board.board[4][7]).toBeInstanceOf(Ship)
    expect(board.board[4][3]).not.toBeInstanceOf(Ship)
    expect(board.board[4][8]).not.toBeInstanceOf(Ship)
    expect(board.board[5][4]).not.toBeInstanceOf(Ship)
})

test('Ship doesn\'t spill out of the board', () => {
    expect(board.board[6][5]).toBeInstanceOf(Ship)
    expect(board.board[6][6]).toBeInstanceOf(Ship)
    expect(board.board[6][7]).toBeInstanceOf(Ship)
    expect(board.board[6][8]).toBeInstanceOf(Ship)
    expect(board.board[6][9]).toBeInstanceOf(Ship)
    expect(board.board[6][4]).not.toBeInstanceOf(Ship)
    expect(board.board[5][5]).not.toBeInstanceOf(Ship)
})

test('Ship is placed vertically from (2,2) to (2,4)', () => {
    expect(board.board[2][2]).toBeInstanceOf(Ship)
    expect(board.board[3][2]).toBeInstanceOf(Ship)
    expect(board.board[4][2]).toBeInstanceOf(Ship)
    expect(board.board[1][2]).not.toBeInstanceOf(Ship)
    expect(board.board[5][2]).not.toBeInstanceOf(Ship)
    expect(board.board[2][1]).not.toBeInstanceOf(Ship)
})

test('Ship doesn\'t spill out of the board when placed vertically', () => {
    expect(board.board[5][1]).toBeInstanceOf(Ship)
    expect(board.board[6][1]).toBeInstanceOf(Ship)
    expect(board.board[7][1]).toBeInstanceOf(Ship)
    expect(board.board[8][1]).toBeInstanceOf(Ship)
    expect(board.board[9][1]).toBeInstanceOf(Ship)
    expect(board.board[4][1]).not.toBeInstanceOf(Ship)
    expect(board.board[5][2]).not.toBeInstanceOf(Ship)
})

test('Ship receives damage which can be checked regardless of coordinate', () => {
    expect(board.board[4][4].hits).toBe(1)
    expect(board.board[4][5].hits).toBe(1)
    expect(board.board[4][6].hits).toBe(1)
    expect(board.board[4][7].hits).toBe(1)
})

test('Ships can be sunk', () => {
    expect(board.board[2][2].isSunk()).toBe(true)
    expect(board.board[3][2].hits).toBe(3)
})

test('Misses are recorded', () => {
    expect(board.missed[0][0]).toBe(3)
    expect(board.missed[0][1]).toBe(9)
})

test('All sunk check works', () => {
    expect(board.allSunk()).toBe(false)
    expect(sunk.allSunk()).toBe(true)
})