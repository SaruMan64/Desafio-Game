const players = require("../players.json");
const fs = require('fs');


const check = function(name) {
    for(let i = 0; i < players.length; i++) { // Checks if the name already exists
        if(name.toLowerCase() === players[i].name.toLowerCase()) {
            return true;
        };
    }
    return false;
}

module.exports = check;