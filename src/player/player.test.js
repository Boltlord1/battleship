import Player from "./player.js"

test('Type is correct', () => {
    const human = new Player(1)
    const bot = new Player(0)
    expect(human.type).toBe('Human')
    expect(bot.type).toBe('Computer')
})

test('Board functions work from within Player class', () => {
    const player = new Player(1)
    player.board.placeShip(1, 2, 2)
    player.board.receiveAttack(1, 5)
    player.board.receiveAttack(2, 2)
    expect(player.board.ships[0].isSunk()).toBe(true)
    expect(player.board.allSunk()).toBe(true)
    expect(player.board.missed[0][0]).toBe(1)
    expect(player.board.missed[0][1]).toBe(5)
})