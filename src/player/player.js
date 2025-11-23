import Gameboard from '../gameboard/gameboard.js'
export default class Player {
    constructor(type = 0, name) {
        this.name = name
        if (type === 1) this.type = 'Human'
        else this.type = 'Computer'
        this.board = new Gameboard()
    }
}