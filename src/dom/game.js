function Board(player) {
    let mode = 0
    const changeMode = () => mode = mode === 0 ? 1 : 0
    const side = document.createElement('div')
    side.classList.add('side')
    let selected

    const ships = document.createElement('div')
    ships.classList.add('ships')
    const ship = [ {length: 5, name: 'Cruiser'}, {length: 4, name: 'Battleship'}, {length: 3, name: 'Destroyer'},
        {length: 3, name: 'Submarine'}, {length: 2, name: 'Patrol'} ]
    for (const shi of ship) {
        shi.placed = false
        shi.position = null
        shi.ele = document.createElement('div')
        shi.ele.textContent = shi.name
        shi.ele.classList.add('ship')
        ships.appendChild(shi.ele)
        shi.ele.addEventListener('click', () => selected = shi)
    }
    const getShips = () => ship

    const board = document.createElement('div')
    board.classList.add('board')
    const grid = new Array(10)
    for (let y = 0; y < 10; y++) {
        grid[y] = new Array(10)
        for (let x = 0; x < 10; x++) {
            grid[y][x] = document.createElement('div')
            grid[y][x].classList.add('cell')
            grid[y][x].id = `x${x}-y${y}`
            grid[y][x].addEventListener('click', () => {
                if (mode === 1) attackCell(x, y)
                else placeShip(x, y)
            })
            board.appendChild(grid[y][x])
        }
    }

    let vertical = false
    const rotate = document.createElement('div')
    rotate.addEventListener('click', () => vertical = vertical ? false : true)
    rotate.classList.add('rotate')
    rotate.textContent = 'Rotate'

    side.appendChild(ships)
    side.appendChild(board)
    side.appendChild(rotate)

    const placeShip = (x, y) => {
        if (!selected) return
        if (vertical) {
            if (y + selected.length > 10) y = 10 - selected.length
            for (let i = 0; i < selected.length; i++) {
                if (grid[y + i][x].classList.contains('placed')
                && !grid[y + i][x].classList.contains(selected.name)) return
            }
        } else {
            if (x + selected.length > 10) x = 10 - selected.length
            for (let i = 0; i < selected.length; i++) {
                if (grid[y][x + i].classList.contains('placed')
                && !grid[y][x + i ].classList.contains(selected.name)) return
            }
        }
        if (selected.placed) {
            const placed = document.querySelectorAll(`.${selected.name}`)
            placed.forEach((item) => {
                item.classList.remove(selected.name)
                item.classList.remove('placed')
            })
        }
        if (vertical) {
            for (let i = 0; i < selected.length; i++) {
                grid[y + i][x].classList.add(selected.name)
                grid[y + i][x].classList.add('placed')
            }
        } else {
            for (let i = 0; i < selected.length; i++) {
                grid[y][x + i].classList.add(selected.name)
                grid[y][x + i].classList.add('placed')
            }
        }
        selected.placed = true
        selected.position = [x, y, vertical]
    }

    function attackCell(x, y) {
        if (grid[y][x].classList.contains('shot')) return
        grid[y][x].classList.add('shot')
        if (player.board.receiveAttack(x, y)) {
            grid[y][x].classList.add('hit')
        } else {
            grid[y][x].classList.add('missed')
        }
    }

    return { side, changeMode, getShips }
}

export default function displayGame(one, two) {
    const main = document.querySelector('.main')
    main.classList.add('game')
    main.classList.remove('info')
    main.replaceChildren()
    const left = Board(one)
    const right = Board(two)

    const title = document.createElement('h1')
    title.textContent = `${one.name} vs. ${two.name}`
    title.classList.add('title')
    main.appendChild(title)
    main.appendChild(left.side)
    main.appendChild(right.side)

    const go = document.createElement('button')
    go.classList.add('go')
    go.textContent = 'Go'
    main.appendChild(go)
    go.addEventListener('click', () => {
        for (const ship of left.getShips()) {
            if (!ship.placed) return
            one.board.placeShip(ship.length, ship.position[0], ship.position[1], ship.position[2])
        }
        // for (const ship of right.getShips()) {
        //     if (!ship.placed) return
        //     one.board.placeShip(ship.length, ship.position[0], ship.position[1], ship.position[2])
        // }
        left.changeMode()
        right.changeMode()
    })
}