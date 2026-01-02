import eventManager from './event.js'

export default function Side(player, enemy) {
    const side = document.createElement('div')
    side.classList.add('side')
    const obj = {}

    let selected
    const getSelected = () => selected
    let vertical = false
    const getVertical = () => vertical
    const event = eventManager(player, side, getSelected, getVertical)

    const board = document.createElement('div')
    board.classList.add('board')
    const grid = []
    for (let y = 0; y < 10; y++) for (let x = 0; x < 10; x++) {
        const cell = document.createElement('button')
        cell.classList.add('cell')
        cell.id = `x${x}y${y}`
        grid.push(cell)
        board.appendChild(cell)
    }
    side.appendChild(board)

    if (!player.computer) {
        const select = document.createElement('div')
        select.classList.add('ships')
        const ships = []
        for (const ship of player.getShips()) {
            const button = document.createElement('button')
            button.textContent = ship.name
            button.classList.add('select')
            select.appendChild(button)
            ships.push(button)
        }

        const rotate = document.createElement('button')
        rotate.textContent = 'Rotate'
        rotate.classList.add('rotate')
        select.appendChild(rotate)
        side.appendChild(select)
        obj.enable = () => {
            rotate.addEventListener('click', () => {
                vertical = vertical ? false : true
                rotate.classList.toggle('selected')
            })
            for (const [index, ship] of player.getShips().entries()) {
                ships[index].addEventListener('click', () => {
                    selected = ship
                    const prev = side.querySelector('.select.selected')
                    if (prev !== null) prev.classList.remove('selected')
                    ships[index].classList.add('selected')
                })
            }
            for (const cell of grid) {
                cell.addEventListener('mouseover', event.hoverShip)
                cell.addEventListener('mouseout', event.removeHover)
                cell.addEventListener('focus', event.hoverShip)
                cell.addEventListener('blur', event.removeHover)
                cell.addEventListener('click', event.placeShip)
            }
        }
    }
    document.querySelector('main').appendChild(side)

    obj.initialize = () => {
        if (!player.computer && !enemy.computer) event.removeShips()
        player.initialize()
        for (const cell of grid) {
            if (!player.computer) {
                cell.removeEventListener('mouseover', event.hoverShip)
                cell.removeEventListener('mouseout', event.removeHover)
                cell.removeEventListener('focus', event.hoverShip)
                cell.removeEventListener('blur', event.removeHover)
                cell.removeEventListener('click', event.placeShip)
            }
            if (!enemy.computer) cell.addEventListener('click', event.receiveAttack)
        }
        const select = side.querySelector('.ships')
        if (select !== null) side.removeChild(select)
    }

    if (player.computer && enemy.computer) event.displayShips()
    obj.displayCells = event.displayCells

    return obj
}