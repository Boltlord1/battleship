export default function getPositions(coordinates, length, vertical = false) {
    const left = length % 2 === 0 ? length / 2 - 1 : Math.floor(length / 2)
    const right = length - 1 - left
    const base = coordinates[0] - left < 1 ? 0 : coordinates[0] + right > 9 ? 9 - (left + right) : coordinates[0] - right

    const positions = []
    if (!vertical) for (let k = 0; k < length; k++) positions.push([base + k, coordinates[1]])
    else for (let k = 0; k < length; k++) positions.push([coordinates[1], base + k])
    return positions
}