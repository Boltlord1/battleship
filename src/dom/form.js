import Player from '../player/player.js'
import displayGame from './game.js'

function Section(computer, right = false) {
    let attach = right ? '-right' : '-left'
    const section = document.createElement('section')
    section.classList.add('section')
    const lName = document.createElement('label')
    const iName = document.createElement('input')
    const iHuman = document.createElement('input')
    const bHuman = document.createElement('label')
    const lHuman = document.createElement('label')
    const iComp = document.createElement('input')
    const bComp = document.createElement('label')
    const lComp = document.createElement('label')

    lName.textContent = 'Name'
    lName.htmlFor = 'name' + attach
    iName.type = 'text'
    iName.name = 'name' + attach
    iName.id = 'name' + attach
    section.appendChild(lName)
    section.appendChild(iName)

    iHuman.type = 'radio'
    iHuman.name = 'type' + attach
    iHuman.value = 1
    iHuman.id = 'human' + attach
    iComp.type = 'radio'
    iComp.name = 'type' + attach
    iComp.value = 0
    iComp.id = 'comp' + attach
    section.appendChild(iHuman)
    section.appendChild(iComp)

    bHuman.classList.add('radio')
    bComp.classList.add('radio')
    bHuman.htmlFor = 'human' + attach
    bComp.htmlFor = 'comp' + attach
    lHuman.textContent = 'Human'
    lHuman.htmlFor = 'human' + attach
    lComp.textContent = 'Computer'
    lComp.htmlFor = 'comp' + attach
    section.appendChild(bHuman)
    section.appendChild(lHuman)
    section.appendChild(bComp)
    section.appendChild(lComp)

    function swap() {
        if (!computer) {
            iName.placeholder = 'Player'
            bHuman.classList.add('selected')
            bComp.classList.remove('selected')
        } else {
            iName.placeholder = 'Computer'
            bComp.classList.add('selected')
            bHuman.classList.remove('selected')
        }
        computer = computer ? false : true
    }
    swap()
    iHuman.addEventListener('change', swap)
    iComp.addEventListener('change', swap)
    computer ? iHuman.checked = true : iComp.checked = true

    return section
}

export default function displayForm() {
    const main = document.querySelector('main')
    main.classList.remove('game')
    main.replaceChildren()
    const form = document.createElement('form')
    form.classList.add('form')
    main.appendChild(form)

    const left = Section(false)
    const right = Section(true, true)
    const start = document.createElement('button')
    start.classList.add('start')
    start.textContent = 'Start game'
    start.type = 'submit'
    form.appendChild(left)
    form.appendChild(start)
    form.appendChild(right)

    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const leftName = formData.get('name-left')
        const leftType = formData.get('type-left')
        const rightName = formData.get('name-right')
        const rightType = formData.get('type-right')
        displayGame(new Player(leftType, leftName), new Player(rightType, rightName))
    })
}