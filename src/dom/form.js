import Player from '../player/player.js'
import displayGame from './game.js'
import swap from './swap.js'

const Form = function(place, attach, check) {
    const form = document.createElement('form')
    const nameLabel = document.createElement('label')
    const name = document.createElement('input')
    const human = document.createElement('input')
    const humanDiv = document.createElement('label')
    const humanLabel = document.createElement('label')
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

    human.type = 'radio'
    human.name = 'type'
    human.value = 1
    human.id = 'Human' + attach
    comp.type = 'radio'
    comp.name = 'type'
    comp.value = 0
    comp.id = 'comp' + attach
    form.appendChild(human)
    form.appendChild(comp)

    humanDiv.classList.add('radio')
    compDiv.classList.add('radio')
    humanDiv.htmlFor = 'Human' + attach
    compDiv.htmlFor = 'comp' + attach
    humanLabel.textContent = 'Human'
    humanLabel.htmlFor = 'Human' + attach
    compLabel.textContent = 'Computer'
    compLabel.htmlFor = 'comp' + attach
    form.appendChild(humanDiv)
    form.appendChild(humanLabel)
    form.appendChild(compDiv)
    form.appendChild(compLabel)

    check ? (human.checked = true, humanDiv.classList.add('checked'))
    : (comp.checked = true, compDiv.classList.add('checked'))
    human.addEventListener('change', () => swap('checked', humanDiv, [compDiv]))
    comp.addEventListener('change', () => swap('checked', compDiv, [humanDiv]))

    let playerObj
    const player = () => playerObj
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const name = formData.get('name') ? formData.get('name') : place
        const type = Number(formData.get('type'))
        playerObj = new Player(type, name)
    })

    return { form, player }
}

export default function displayForms() {
    const main = document.querySelector('.main')
    main.classList.add('info')
    main.classList.remove('game')
    main.replaceChildren()
    const left = Form('Player', '-a', true)
    const right = Form('Computer', '-b', false)
    main.appendChild(left.form)
    main.appendChild(right.form)

    const start = document.createElement('button')
    start.textContent = 'Start game'
    start.classList.add('start')
    main.appendChild(start)
    start.addEventListener('click', () => {
        left.form.dispatchEvent(new Event('submit'))
        right.form.dispatchEvent(new Event('submit'))
        displayGame(left.player(), right.player())
    })
}