import clickCell from './clickCell.js'

function Side(player, right = false) {
    const side = document.createElement('div')
    side.classList.add('side')
    side.classList.add(right ? 'right' : 'left')

    const board = document.createElement('div')
    board.classList.add('board')
    const grid = []
    for (let i = 0; i < 10; i++) for (let j = 0; j < 10; j++) {
        grid.push(document.createElement('button'))
        grid.at(-1).id = `x${j}y${i}`
        grid.at(-1).classList.add('cell')
        board.appendChild(grid.at(-1))
        grid.at(-1).addEventListener('click', clickCell)
    }
    side.appendChild(board)

    return side
}

export default function displayGame(one, two) {
    const main = document.querySelector('main')
    main.classList.add('game')
    main.replaceChildren()

    const left = Side(one)
    const right = Side(two, true)
    const title = document.createElement('h1')
    if (one.name === two.name) title.textContent = `${one.name} 1 vs. ${two.name} 2`
    else title.textContent = `${one.name} vs. ${two.name}`
    title.classList.add('title')
    const go = document.createElement('button')
    go.textContent = 'Go'
    go.classList.add('go')

    main.appendChild(title)
    main.appendChild(left)
    main.appendChild(go)
    main.appendChild(right)
}