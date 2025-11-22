import Ship from '../ship/ship.js'
export default class Gameboard {
    constructor(x = 10, y = 10) {
        this.board = new Array(y)
        for (let i = 0; i < y; i++) {
            this.board[i] = new Array(x)
            for (let j = 0; j < x; j++) {
                this.board[i][j] = 0
            }
        }
        this.length = x
        this.height = y
        this.ships = new Array()
        this.missed = new Array()
    }

    placeShip(length, x, y, vertical = false) {
        this.ships.push(new Ship(length))
        if (vertical) {
            if (y + length > this.height) y = this.height - length
            for (let i = 0; i < length; i++) {
                this.board[y + i][x] = this.ships.at(-1)
            }
        } else {
            if (x + length > this.length) x = this.length - length
            for (let i = 0; i < length; i++) {
                this.board[y][x + i] = this.ships.at(-1)
            }
        }
    }

    receiveAttack(x, y) {
        if (this.board[y][x] instanceof Ship) this.board[y][x].hit()
        else this.missed.push([x, y])
    }

    allSunk() {
        return this.ships.reduce((bool, ship) => bool = bool ? ship.isSunk() : false, true)
    }
}