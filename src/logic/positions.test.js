import getPositions from './positions.js'

test('Placement of 2 on (5, 5) returns [5, 5], [5, 6]', () => {
    const positions = getPositions([5, 5], 2)
    expect(positions[0][0]).toBe(5)
    expect(positions[0][1]).toBe(5)
    expect(positions[1][0]).toBe(6)
    expect(positions[1][1]).toBe(5)
})

test('Vertical placement of 3 on (5, 5) returns [5, 5], [5, 6], [5, 7]', () => {
    const positions = getPositions([5, 5], 3, true)
    expect(positions[0][0]).toBe(5)
    expect(positions[0][1]).toBe(5)
    expect(positions[1][0]).toBe(5)
    expect(positions[1][1]).toBe(6)
    expect(positions[2][0]).toBe(5)
    expect(positions[2][1]).toBe(7)
})

test('Works with placement on the start of the board', () => {
    const horizontal = getPositions([0, 0], 2)
    expect(horizontal[0][0]).toBe(0)
    expect(horizontal[0][1]).toBe(0)
    expect(horizontal[1][0]).toBe(1)
    expect(horizontal[1][1]).toBe(0)

    const vertical = getPositions([0, 0], 2, true)
    expect(vertical[0][0]).toBe(0)
    expect(vertical[0][1]).toBe(0)
    expect(vertical[1][0]).toBe(0)
    expect(vertical[1][1]).toBe(1)
})

test('Works with placement on the end of the board', () => {
    const horizontal = getPositions([9, 9], 3)
    expect(horizontal[0][0]).toBe(7)
    expect(horizontal[0][1]).toBe(9)
    expect(horizontal[1][0]).toBe(8)
    expect(horizontal[1][1]).toBe(9)
    expect(horizontal[2][0]).toBe(9)
    expect(horizontal[2][1]).toBe(9)

    const vertical = getPositions([9, 9], 3, true)
    expect(vertical[0][0]).toBe(9)
    expect(vertical[0][1]).toBe(7)
    expect(vertical[1][0]).toBe(9)
    expect(vertical[1][1]).toBe(8)
    expect(vertical[2][0]).toBe(9)
    expect(vertical[2][1]).toBe(9)
})