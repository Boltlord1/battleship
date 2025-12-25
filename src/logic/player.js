import Gameboard from './gameboard.js'
import getPositions from './positions.js'

export default function Player(active) {
    const board = Gameboard()
    const ships = [
        { name: 'Carrier', length: 5 },
        { name: 'Battleship', length: 4 },
        { name: 'Destroyer', length: 3 },
        { name: 'Submarine', length: 3 },
        { name: 'Patrol', length: 2 }
    ]

    const getShips = () => ships
    const placeShip = (coordinates, name, vertical) => {
        const ship = ships.find(item => item.name === name)
        const others = ships.filter(item => item.name !== name)

        const positions = getPositions(coordinates, ship.length, vertical)
        for (const other of others) {
            if (other.hasOwnProperty('positions')) continue
            for (const [i, j] of other.positions)
                for (const [x, y] of positions)
                    if (x === i && y === j) return
        }
        ship.positions = positions
    }

    const attackedCells = []
    const receiveAttack = (coordinates) => {
        if (active.check()) return
        for (const [x, y] of attackedCells)
            if (x === coordinates[0] && y === coordinates[1]) return

        active.switch()
        attackedCells.push(coordinates)
        if (board.receiveAttack(coordinates))
            if (board.sunkAt(coordinates)) 
                if (board.allSunk()) return
    }

    const initialize = (left = false) => {
        for (const ship of ships)
            if (!ship.hasOwnProperty('positions'))
                return
        for (const ship of ships) {
            board.placeShip(ship.positions)
        }
    }

    return { getShips, placeShip, receiveAttack, initialize }
}