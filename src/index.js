import './styles.css'
import displayForm from './dom/form'

const reset = document.querySelector('.reset')
reset.addEventListener('click', displayForm)
reset.dispatchEvent(new Event('click'))

const form = document.querySelector('.form')
form.dispatchEvent(new Event('submit'))