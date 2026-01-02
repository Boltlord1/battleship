import './styles.css'
import displayForms from './dom/form.js'

displayForms()
const reset = document.querySelector('.reset')
reset.addEventListener('click', displayForms)