import Player from './player.js'
import getPositions from './positions.js'

export default function Computer(name, active, smart = true) {
    const computer = true
    const player = Player(name, active)

    let verify = null
    let mode = 1
    const noted = []

    function findAttack() {
        const length = noted.length
        if (mode === 2 && length > 1 && inLine(noted[length - 1], noted[length - 2])) {
            mode = 3
            return findAttack()
        } else if (mode === 1 && length > 0) {
            mode = 2
            return findAttack()
        } else if (length === 0) {
            mode = 1
        }
        while (mode === 3) {
            const coordinates = findLine(noted[length - 1], noted[length - 2][0])
            if (coordinates !== false) return coordinates
            noted.pop()
            mode = 2
            return findAttack()
        }
        while (mode === 2) {
            const coordinates = findAdjacent(noted[length - 1])
            if (coordinates !== false) return coordinates
            noted.pop()
            return findAttack()
        }
        return randomAttack()
    }

    function randomAttack() {
        while (true) {
            const coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
            const status = verify(coordinates[0], coordinates[1])
            if (status) return coordinates
        }
    }

    function findAdjacent(coordinates) {
        const [x, y] = coordinates
        if (verify(x - 1, y)) return [x - 1, y]
        if (verify(x + 1, y)) return [x + 1, y]
        if (verify(x, y - 1)) return [x, y - 1]
        if (verify(x, y + 1)) return [x, y + 1]
        return false
    }

    function inLine(current, previous) {
        const [x, y] = current
        const [i, j] = previous
        if (x === i) return y === j - 1 || y === j + 1
        else if (y === j) return x === i - 1 || x === i + 1
        return false
    }

    function findLine(attack, prev) {
        const [x, y] = attack
        if (x === prev) {
            if (prev === y + 1 && verify(x, y - 1)) return [x, y - 1]
            if (prev === y - 1 && verify(x, y + 1)) return [x, y + 1]
        } else {
            if (prev === x + 1 && verify(x - 1, y)) return [x - 1, y]
            if (prev === x - 1 && verify(x + 1, y)) return [x + 1, y]
        }
        return false
    }

    function clearNoted(ships) {
        if (noted.length === 0 || noted.at(-1)[2] !== 3) return
        for (const ship of ships)
            for (const [x, y] of ship.positions) {
                const index = noted.findIndex(c => x === c[0] && y === c[1])
                if (index < 0) continue
                noted.splice(index, 1)
            }
    }

    for (const ship of player.getShips()) {
        while (ship.positions === null) {
            const coordinates = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
            const positions = getPositions(coordinates, ship.length, Math.random() < 0.5)
            if (!player.verifyPlacement(positions, ship.name)) continue
            player.placeShip(positions, ship.name)
        }
    }

    const setupAttack = (enemy, displayCells, delay = 1000) => {
        if (typeof delay !== 'number' || delay < 0 || delay > 5000) delay = 1000
        if (enemy.receiveAttack([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]) > 1) noted.push(enemy.getAttacked().at(-1))

        function retaliate(coordinates) {
            const prev = player.receiveAttack(coordinates)
            if (prev === false) return false
            setTimeout(() => {
                const attack = smart ? findAttack(noted.length) : randomAttack()
                const status = enemy.receiveAttack(attack)
                if (status > 1) {
                    console.log(noted.toSpliced())
                    noted.push(enemy.getAttacked().at(-1))
                    clearNoted(enemy.getShips().filter(ship => ship.destroyed))
                    console.log(noted.toSpliced())
                }
                displayCells()
            }, (delay))
            return prev
        }

        verify = enemy.verifyAttack
        obj.receiveAttack = retaliate
    }

    const obj = { ...player, computer, setupAttack }
    return obj
}