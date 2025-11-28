import Gameboard from '../gameboard/gameboard.js'
export default class Player {
    constructor(type = 0, name) {
        this.type = Number(type)
        if (!name) this.name = this.type ? 'Player' : 'Computer'
        else this.name = name.trim()
        this.board = new Gameboard()
    }
}