import getPositions from '../logic/positions.js'

export default function eventManager(player, side, getSelected, getVertical) {

    const getCoordinatesFromId = (id) => [Number(id.charAt(1)), Number(id.charAt(3))]

    const verifyPositions = (coordinates) => {
        const selected = getSelected()
        if (selected === undefined) return null
        const positions = getPositions(coordinates, selected.length, getVertical())
        if (!player.verifyPlacement(positions, selected.name)) return null
        return positions
    }

    const addClass = (positions, className) => {
        for (const [x, y] of positions) {
            const cell = side.querySelector(`#x${x}y${y}`)
            cell.classList.add(className)
        }
    }

    const removeClass = (className) => {
        const cells = side.querySelectorAll('.' + className)
        cells.forEach(cell => cell.classList.remove(className))
    }

    const displayShips = () => {
        const ships = player.getShips()
        removeClass('ship')
        for (const ship of ships) {
            if (ship.positions === null) continue
            removeClass(ship.className)
            addClass(ship.positions, 'ship')
        }
    }

    const displayDestroyed = () => {
        const ships = player.getShips()
        for (const ship of ships) {
            if (ship.destroyed) addClass(ship.positions, 'destroyed')
        }
    }

    const displayCells = () => {
        if (player.getAttacked().length === 0) return
        const [x, y, status] = player.getAttacked().at(-1)
        const cell = side.querySelector(`#x${x}y${y}`)
        if (status === 1) cell.classList.add('miss')
        if (status > 1) cell.classList.add('hit')
        if (status > 2) displayDestroyed()
    }

    const hoverShip = (e) => {
        const positions = verifyPositions(getCoordinatesFromId(e.target.id))
        if (positions === null) return
        addClass(positions, 'hovered')
    }

    const placeShip = (e) => {
        const positions = verifyPositions(getCoordinatesFromId(e.target.id))
        if (positions === null) return
        const selected = getSelected()
        player.placeShip(positions, selected.name)
        displayShips()
    }

    const removeHover = () => removeClass('hovered')
    const removeShips = () => removeClass('ship')

    const receiveAttack = (e) => {
        const coordinates = getCoordinatesFromId(e.target.id)
        player.receiveAttack(coordinates)
        setTimeout(displayCells, 0)
    }

    if (!player.computer) return { hoverShip, removeHover, placeShip, receiveAttack, displayCells, removeShips }
    else return { displayShips, receiveAttack, displayCells }
}