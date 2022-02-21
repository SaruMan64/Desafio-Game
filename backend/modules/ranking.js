const players = require("../players.json");

const ranking = function() {    // Sort by final score
    let counter = players.length;
    for(let i = 0; i < players.length-1; i++) {
        for(let j = 0; j < counter-1; j++) {
            if(players[j].score.final < players[j+1].score.final) {
                const aux = players[j];
                players[j] = players[j+1];
                players[j+1] = aux;
            }
        }
        counter--;
    }
    return players;
}

module.exports = ranking;