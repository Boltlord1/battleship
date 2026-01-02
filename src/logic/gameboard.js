import Ship from './ship.js'

export default function Gameboard() {
    const ships = []
    const board = []
    for (let i = 0; i < 10; i++) {
        const row = []
        for (let j = 0; j < 10; j++) {
            row.push(null)
        }
        board.push(row)
    }

    const placeShip = (positions) => {
        const ship = Ship(positions.length)
        for (const [x, y] of positions) {
            board[y][x] = ship
        }
        ships.push(ship)
    }

    const receiveAttack = (coordinates) => {
        const [x, y] = coordinates
        const cell = board[y][x]
        if (cell !== null) {
            cell.hit()
            return 2
        }
        return 1
    }

    const sunkAt = (coordinates) => {
        const [x, y] = coordinates
        const cell = board[y][x]
        if (cell !== null && cell.isSunk()) return 3
        return false
    }

    const allSunk = () => {
        if (ships.reduce((bool, ship) => bool = bool ? ship.isSunk() : false, true)) return 4
        return false
    }

    return { placeShip, receiveAttack, sunkAt, allSunk }
}