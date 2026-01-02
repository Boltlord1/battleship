import Gameboard from './gameboard.js'

function Ship(name, length) {
    let positions = null
    let destroyed = false
    const className = name.split(' ')[0].toLowerCase()
    return { name, length, positions, destroyed, className }
}

export default function Player(name, active) {
    const computer = false
    const board = Gameboard()
    const ships = [ Ship('Carrier', 5), Ship('Battleship', 4), Ship('Destroyer', 3), Ship('Submarine', 3), Ship('Patrol Boat', 2) ]

    const getShips = () => ships
    const placeShip = (positions, name) => ships.find(item => item.name === name).positions = positions
    const verifyPlacement = (positions, name) => {
        for (const ship of ships.filter(ship => ship.name !== name)) {
            if (ship.positions === null) continue
            for (const [i, j] of ship.positions)
                for (const [x, y] of positions)
                    if (x === i && y === j) return false
        }
        return true
    }

    const findShip = (coordinates) => {
        const [x, y] = coordinates
        for (const ship of ships) for (const [i, j] of ship.positions) {
            if (i === x && j === y) return ship
        }
    }

    const attackedCells = []
    const getAttacked = () => attackedCells
    const verifyAttack = (x, y) => {
        if (x < 0 || x > 9 || y < 0 || y > 9) return false
        for (const [i, j] of attackedCells)
            if (x === i && y === j) return false
        return true
    }

    const receiveAttack = (coordinates) => {
        if (!verifyAttack(coordinates[0], coordinates[1])) return false
        if (!active.check()) return false

        active.switch()

        let status = board.receiveAttack(coordinates)
        const one = board.sunkAt(coordinates)
        const all = board.allSunk()

        if (status) {
            if (one) {
                if (all) status = all
                else status = one
            }
        }
        if (status > 2) {
            const ship = findShip(coordinates)
            ship.destroyed = true
        }
        if (status === 4) win()
        attackedCells.push([...coordinates, status])
        return status
    }

    const verify = () => {
        for (const ship of ships)
            if (ship.positions === null)
                return false
        return true
    }

    const initialize = () => {
        for (const ship of ships) {
            board.placeShip(ship.positions, ship.name)
        }
    }

    const win = () => {
        active.win()
    }

    const obj = { name, computer, getAttacked, getShips, placeShip, verifyPlacement, receiveAttack, verifyAttack, verify, initialize }
    return obj
}