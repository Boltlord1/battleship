import Player from '../player/player.js'
import Board from './board.js'
import swap from './swap.js'

const Form = function(place, attach, check) {
    const form = document.createElement('form')
    const nameLabel = document.createElement('label')
    const name = document.createElement('input')
    const player = document.createElement('input')
    const playerDiv = document.createElement('label')
    const playerLabel = document.createElement('label')
    const comp = document.createElement('input')
    const compDiv = document.createElement('label')
    const compLabel = document.createElement('label')
    form.classList.add('form')

    nameLabel.textContent = 'Name'
    nameLabel.htmlFor = 'name' + attach
    name.type = 'text'
    name.name = 'name'
    name.id = 'name' + attach
    name.placeholder = place
    form.appendChild(nameLabel)
    form.appendChild(name)

    player.type = 'radio'
    player.name = 'type'
    player.value = 0
    player.id = 'player' + attach
    comp.type = 'radio'
    comp.name = 'type'
    comp.value = 1
    comp.id = 'comp' + attach
    form.appendChild(player)
    form.appendChild(comp)

    playerDiv.classList.add('radio')
    compDiv.classList.add('radio')
    playerDiv.htmlFor = 'player' + attach
    compDiv.htmlFor = 'comp' + attach
    playerLabel.textContent = 'Player'
    playerLabel.htmlFor = 'player' + attach
    compLabel.textContent = 'Computer'
    compLabel.htmlFor = 'comp' + attach
    form.appendChild(playerDiv)
    form.appendChild(playerLabel)
    form.appendChild(compDiv)
    form.appendChild(compLabel)

    check ? (player.checked = true, playerDiv.classList.add('selected'))
    : (comp.checked = true, compDiv.classList.add('selected'))
    player.addEventListener('change', () => swap('selected', playerDiv, [compDiv]))
    comp.addEventListener('change', () => swap('selected', compDiv, [playerDiv]))

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const name = formData.get('name') ? formData.get('name') : place
        const type = Number(formData.get('type'))
        // const board = Board(new Player(type, name))
        form.reset()
    })

    return form
}

export default function displayForms() {
    const main = document.querySelector('.main')
    main.replaceChildren()
    const left = Form('Player One', '-a', true)
    const right = Form('Player Two', '-b', false)
    main.appendChild(left)
    main.appendChild(right)

    const start = document.createElement('button')
    start.textContent = 'Start game'
    start.classList.add('start')
    start.addEventListener('click', () => {
        left.dispatchEvent(new Event('submit'))
        right.dispatchEvent(new Event('submit'))
    })
    main.appendChild(start)
}