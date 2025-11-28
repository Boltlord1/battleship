export default function clickCell(event) {
    console.log(`(${event.target.id.charAt(1)}, ${event.target.id.charAt(3)})`)
    console.log(event.target.parentElement.parentElement.classList.contains('right'))
}