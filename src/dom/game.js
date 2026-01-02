import Side from './side.js'

export default function displayGame(one, two) {
    const main = document.querySelector('main')
    main.replaceChildren()

    const title = document.createElement('h2')
    title.classList.add('title')
    title.textContent = one.name + ' vs. ' + two.name

    const start = document.createElement('button')
    start.classList.add('start')

    main.appendChild(title)
    const left = Side(one, two)
    main.appendChild(start)
    const right = Side(two, one)

    if (!one.computer) left.enable()
    else if (!two.computer) right.enable()

    function go() {
        if (one.verify() && two.verify()) {
            left.initialize()
            right.initialize()
            if (one.computer) one.setupAttack(two, right.displayCells, two.computer ? 200 : 0)
            if (two.computer) two.setupAttack(one, left.displayCells, one.computer ? 200 : 0)
            if (one.computer && !two.computer) right.displayCells()
            start.style.opacity = 0
        }
    }

    function ready() {
        if (!one.verify()) return
        left.initialize()
        right.enable()
        start.textContent = 'Player 2 ready'
        if (!two.verify()) return
        right.initialize()
        start.style.opacity = 0
    }

    if (!one.computer && !two.computer) {
        start.textContent = 'Player 1 Ready'
        start.addEventListener('click', ready)
    } else {
        start.textContent = 'Start'
        start.addEventListener('click', go)
    }
}