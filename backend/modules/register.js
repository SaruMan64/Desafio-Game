const allPlayers = require("../players.json");
const fs = require('fs');
const players = allPlayers;

const player = {
    id: 0,
    name: "",
    score: {
        current: 0,
        final: 0
    }
};

const register = function(name) {
    const filterName = /[^a-zA-Zà-ýÀ-Ý0-9]/;
    if(filterName.test(name)) { // Checks if the name contains only letters and numbers
        return ("Os nomes de usuário não podem conter acentos, números ou caracteres especiais.");
    }

    if(name.length < 1 && name.length > 15) { // Check if the name is too long
        return ("Nome de usuário não tem tamanho suficiente.");
    }

    for(let i = 0; i < players.length; i++) { // Checks if the name already exists
        console.log(players[i].name);
        if(name.toLowerCase() === players[i].name.toLowerCase()) {
            return("Esse nome de usuário não está disponível. Tente outro nome.");
        };
    }

    const currentPlayer = Object.create(player); // Fill player
    currentPlayer.id = players.length + 1;
    currentPlayer.name = name;
    currentPlayer.score = { current: 0, final: 0 };

    players.push(currentPlayer);

    fs.writeFile('./players.json', JSON.stringify(players, null, 2), (err, result) => {
        console.log(err);
    });

    return true;
}

module.exports = register;