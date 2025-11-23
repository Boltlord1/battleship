export default function swap(clss, element, arr) {
    element.classList.add(clss)
    arr.forEach(element => element.classList.remove(clss))
}