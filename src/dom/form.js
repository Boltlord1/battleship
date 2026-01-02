import Player from '../logic/player.js'
import Computer from '../logic/computer.js'
import active from '../logic/active.js'
import displayGame from './game.js'

function Form(id) {
    const form = document.createElement('form')
    form.classList.add('form')

    const lName = document.createElement('label')
    const iName = document.createElement('input')
    lName.textContent = 'Name'
    lName.htmlFor = 'name-' + id
    iName.id = 'name-' + id
    iName.name = 'name'
    iName.placeholder = 'Player'

    const lPlay = document.createElement('label')
    const bPlay = document.createElement('label')
    const iPlay = document.createElement('input')
    lPlay.textContent = 'Player'
    lPlay.htmlFor = 'play-' + id
    bPlay.htmlFor = 'play-' + id
    iPlay.id = 'play-' + id
    iPlay.type = 'radio'
    iPlay.name = 'comp'
    iPlay.value = 0
    iPlay.checked = true

    const lComp = document.createElement('label')
    const bComp = document.createElement('label')
    const iComp = document.createElement('input')
    lComp.textContent = 'Computer'
    lComp.htmlFor = 'comp-' + id
    bComp.htmlFor = 'comp-' + id
    iComp.id = 'comp-' + id
    iComp.type = 'radio'
    iComp.name = 'comp'
    iComp.value = 1

    iName.classList.add('name')
    bPlay.classList.add('radio')
    bPlay.classList.add('selected')
    bComp.classList.add('radio')

    function swap() {
        bPlay.classList.toggle('selected')
        bComp.classList.toggle('selected')
        iName.placeholder = bPlay.classList.contains('selected') ? 'Player' : 'Computer'
    }

    iPlay.addEventListener('change', swap)
    iComp.addEventListener('change', swap)

    form.appendChild(lName)
    form.appendChild(iName)
    form.appendChild(lPlay)
    form.appendChild(bPlay)
    form.appendChild(iPlay)
    form.appendChild(lComp)
    form.appendChild(bComp)
    form.appendChild(iComp)

    form.addEventListener('submit', (e) => e.preventDefault())

    document.querySelector('main').appendChild(form)
    return form
}

function evaluateData(data) {
    const comp = data.get('comp') === '1'
    let name = data.get('name').trim()
    if (name === '') name = comp ? 'Computer' : 'Player'

    return {name, comp}
}

export default function displayForms() {
    const main = document.querySelector('main')
    main.replaceChildren()

    const create = document.createElement('button')
    create.textContent = 'Create Game'
    create.classList.add('create')

    const left = Form('left')
    main.appendChild(create)
    const right = Form('right')

    create.addEventListener('click', () => {
        const one = evaluateData(new FormData(left))
        const two = evaluateData(new FormData(right))
        if (one.name === two.name) {
            one.name += ' 1'
            two.name += ' 2'
        }

        const activity = active()
        const first = one.comp ? Computer(one.name, activity.left) : Player(one.name, activity.left)
        const second = two.comp ? Computer(two.name, activity.right) : Player(two.name, activity.right)
        displayGame(first, second)
    })
}