export default function getPositions(coordinates, length, vertical = false) {
    const left = length % 2 === 0 ? (length / 2) - 1 : Math.floor(length / 2)
    const right = length - 1 - left
    const [ main, side ] = vertical ? [coordinates[1], coordinates[0]] : coordinates
    const base = main - left < 1 ? 0 : main + right > 9 ? 9 - (left + right) : main - left

    const positions = []
    if (!vertical) for (let k = 0; k < length; k++) positions.push([base + k, side])
    else for (let k = 0; k < length; k++) positions.push([side, base + k])
    return positions
}