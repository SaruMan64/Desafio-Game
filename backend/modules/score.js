const players = require("../players.json");

const score = function(name, pointing) {
    if(isNaN(pointing)) { // Check if the value is number
        return ("Não é um número");
    }
    
    let playerExists = false;
    for(let i = 0; i < players.length; i++) { // Checks if the player is already registered
        if(name.toLowerCase() === players[i].name.toLowerCase()) {
            players[i].score.final = pointing;
            playerExists = true;
            return(`O jogador: ${players[i].name} atingiu ${pointing} pontos.`);
        }
    }

    if(!playerExists) { // Check if the player exists
        return ("Usuário não existe.");
    }
}

module.exports = score;