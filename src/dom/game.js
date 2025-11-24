function Board(player, clss) {
    const side = document.createElement('div')
    side.classList.add('side')
    side.classList.add(clss)
    let play = false
    let turn = false
    let enemy
    const changeMode = () => play = play ? false : true
    const setEnemy = (obj) => enemy = obj
    const switchTurn = () => {
        turn = turn ? false : true
        if (player.type === 'Human' && enemy.player.type === 'Computer') {
            while(turn) {
                const x = Math.floor(Math.random() * 8)
                const y = Math.floor(Math.random() * 8)
                attackCell(x, y)
            }
        }
    }

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
                if (play && turn) attackCell(x, y)
                else if (!play) placeShip(x, y)
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
            const placed = document.querySelectorAll(`.${clss} .${selected.name}`)
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
        switchTurn()
        enemy.switchTurn()
        grid[y][x].classList.add('shot')
        if (player.board.receiveAttack(x, y)) {
            grid[y][x].classList.add('hit')
            if (player.board.board[y][x].isSunk())
                if (player.board.allSunk()) endGame()
        } else {
            grid[y][x].classList.add('missed')
        }
    }

    function endGame() {
        enemy.switchTurn()
        const main = document.querySelector('.main')
        const over = document.createElement('h1')
        over.classList.add('over')
        over.textContent = `Game over! ${enemy.player.name} beat ${player.name}`
        main.appendChild(over)
    }

    if (player.type === 'Computer') {
        ship.forEach((shi) => {
            selected = shi
            while(!shi.placed) {
                const x = Math.floor(Math.random() * 8)
                const y = Math.floor(Math.random() * 8)
                placeShip(x, y)
            }
        })
    }

    return { side, player, changeMode, getShips, switchTurn, setEnemy }
}

export default function displayGame(one, two) {
    const main = document.querySelector('.main')
    main.classList.add('game')
    main.classList.remove('info')
    main.replaceChildren()
    const left = Board(one, 'left')
    const right = Board(two, 'right')
    left.setEnemy(right)
    right.setEnemy(left)

    const title = document.createElement('h1')
    title.textContent = `${one.name} vs. ${two.name}`
    title.classList.add('title')
    main.appendChild(title)
    main.appendChild(left.side)
    main.appendChild(right.side)

    let started = false
    const go = document.createElement('button')
    go.classList.add('go')
    go.textContent = 'Go'
    main.appendChild(go)
    go.addEventListener('click', () => {
        if (started) return
        for (const ship of left.getShips()) {
            if (!ship.placed) return
            one.board.placeShip(ship.length, ship.position[0], ship.position[1], ship.position[2])
        }
        for (const ship of right.getShips()) {
            if (!ship.placed) return
            two.board.placeShip(ship.length, ship.position[0], ship.position[1], ship.position[2])
        }
        left.changeMode()
        right.changeMode()
        right.switchTurn()
        started = true
    })
}