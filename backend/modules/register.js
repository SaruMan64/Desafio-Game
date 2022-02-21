const allPlayers = require("../players.json");
const players = allPlayers.players;

const player = {
    id: 0,
    name: "",
    score: {
        current: 0,
        final: 0
    },
    cep: 0
};

const register = function(name) {
    const filterName = /[^a-zA-Z]/;
    if(!filterName.test(name)) { // Checks if the name contains only letters
        return ("Os nomes de usuário não podem conter acentos, números ou caracteres especiais.");
    }

    if(name.length > 15) { // Check if the name is too long
        return ("Nome de usuário muito longo.");
    }

    for(let i = 0; i < players.length; i++) { // Checks if the name already exists
        if(name.toLowerCase() === players[i].name.toLowerCase()) {
            return("Esse nome de usuário não está disponível. Tente outro nome.");
        };
    }

    const currentPlayer = Object.create(player); // Fill player
    currentPlayer.id = players.length+1;
    currentPlayer.name = name;
    currentPlayer.score = { current: 0, final: 0 };

    players.push(currentPlayer);

    return true;
}

module.exports = register;