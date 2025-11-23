import './styles.css'
import displayForms from './dom/form'

const reset = document.querySelector('.reset')
reset.addEventListener('click', displayForms)
reset.dispatchEvent(new Event('click'))