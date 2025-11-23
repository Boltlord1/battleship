import Ship from '../ship/ship.js'
export default class Gameboard {
    constructor() {
        this.board = new Array(10)
        for (let y = 0; y < 10; y++) {
            this.board[y] = new Array(10)
            for (let x = 0; x < 10; x++) {
                this.board[y][x] = 0
            }
        }
        this.ships = new Array()
        this.missed = new Array()
    }

    placeShip(length, x, y, vertical = false) {
        this.ships.push(new Ship(length))
        if (vertical) {
            if (y + length > 10) y = 10 - length
            for (let i = 0; i < length; i++) {
                this.board[y + i][x] = this.ships.at(-1)
            }
        } else {
            if (x + length > 10) x = 10 - length
            for (let i = 0; i < length; i++) {
                this.board[y][x + i] = this.ships.at(-1)
            }
        }
    }

    receiveAttack(x, y) {
        if (this.board[y][x] instanceof Ship) {
            this.board[y][x].hit()
            return true
        }
        else {
            this.missed.push([x, y])
            return false
        }
    }

    allSunk() {
        return this.ships.reduce((bool, ship) => bool = bool ? ship.isSunk() : false, true)
    }
}