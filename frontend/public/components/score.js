let dishMadeMold = {
    broth: "",
    cookingTime: 0,
    quantIngredients: 0,
    ingredients: {
        carrot: 0,
        chashu: 0,
        chicken: 0,
        egg: 0,
        mnema: 0,
        moyashi: 0,
        naruto: 0,
        nori: 0,
        porkrib: 0,
        radish: 0,
        shitake: 0,
        tofu: 0
    }
}

let cookingScore = 0;
let brothScore = 0;
let ingredientsScore = 0;
let orderScore = 0;
let totalScore = 0;

function pointing(dishOrdered, dishMade) { // Calculate the score
    dishMade.quantIngredients = $("#droppable div").length;
    cookingScore = 0;
    brothScore = 0;
    ingredientsScore = 0;
    orderScore = 0;

    if (dishOrdered.cookingTime === dishMade.cookingTime) { // Calculate cooking score
        cookingScore = 50;
    } else if (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime) <= 2) {
        cookingScore = 50 - (3 * (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime)));
    } else {
        cookingScore = 50 - (5 * (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime)));
    }

    switch (dishMade.broth) { // Calculate broth score
        case "#e5d8ac":
            (dishOrdered.broth === "fish") ? brothScore += 50 : brothScore -= 50;
            break;
        case "#ebcf6c":
            (dishOrdered.broth === "chicken") ? brothScore += 50 : brothScore -= 50;
            break;
        case "#a5361a":
            (dishOrdered.broth === "meat") ? brothScore += 50 : brothScore -= 50;
            break;
        case "#573519":
            (dishOrdered.broth === "pork") ? brothScore += 50 : brothScore -= 50;
            break;
        case "#2f2412":
            (dishOrdered.broth === "shoyu") ? brothScore += 50 : brothScore -= 50;
            break;
    }

    for (let i = 0; i < $("#droppable div").length; i++) { // Count ingredients used
        switch ($("#droppable div")[i].id) {
            case "carrot":
                dishMade.ingredients.carrot++;
                break;
            case "chashu":
                dishMade.ingredients.chashu++;
                break;
            case "chicken":
                dishMade.ingredients.chicken++;
                break;
            case "egg":
                dishMade.ingredients.egg++;
                break;
            case "mnema":
                dishMade.ingredients.mnema++;
                break;
            case "moyashi":
                dishMade.ingredients.moyashi++;
                break;
            case "naruto":
                dishMade.ingredients.naruto++;
                break;
            case "nori":
                dishMade.ingredients.nori++;
                break;
            case "porkrib":
                dishMade.ingredients.porkrib++;
                break;
            case "radish":
                dishMade.ingredients.radish++;
                break;
            case "shitake":
                dishMade.ingredients.shitake++;
                break;
            case "tofu":
                dishMade.ingredients.tofu++;
                break;
            default:
                console.log(`Erro: não encontramos o ingrediente.`);
        }
    }

    const ingredientsDishOrdered = Object.entries(dishOrdered.ingredients);
    const ingredientsDishMade = Object.entries(dishMade.ingredients);
    let counterIngredientsDishMade = 0;
    for (let i = 0; i < 4; i++) { // Calculate ingredients score
        for (let j = 0; j < 12; j++) {
            if (ingredientsDishOrdered[i][0] === ingredientsDishMade[j][0]) {
                if (ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1] === 0) {
                    ingredientsScore += 10 * ingredientsDishOrdered[i][1];
                } else {
                    if (ingredientsDishOrdered[i][1] > ingredientsDishMade[j][1]) {
                        ingredientsScore -= 10 * Math.abs(ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1]);
                    } else {
                        ingredientsScore += 10 * ingredientsDishOrdered[i][1];
                        ingredientsScore -= 10 * Math.abs(ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1]);
                    }
                }
                counterIngredientsDishMade += ingredientsDishMade[j][1];
            }
        }
    }
    ingredientsScore -= 10 * (dishMade.quantIngredients - counterIngredientsDishMade);

    orderScore = cookingScore + brothScore + ingredientsScore;
    totalScore += orderScore;
    return {cookingScore, brothScore, ingredientsScore, orderScore, totalScore};
}

function clearKitchen() { // Remove the dish made and the current order
    $("#droppable").html("");
    $("#droppable").css("background-color", "");
    $("#droppable").css("background-image", "");
    $("#order-drop").html("");
    $("#pot").css("background-image", "");
}

function showRanking(players) { // Create the ranking in html
    console.log(players);
    console.log(JSON.stringify(players));
    $("#ranking").html("");
    $("#ranking").append(`<table>
    <tr>
        <th>Posição</th>
        <th>Usuário</th>
        <th>Pontuação</th>
    </tr>
</table>`);
    let numberPlayersRanking;
    (players.length <= 10) ? numberPlayersRanking = players.length : numberPlayersRanking = 10;

    for (let i = 0; i < numberPlayersRanking; i++) {
        $("table").append(`<tr>
        <td>${i + 1}</td>
        <td>${players[i].name}</td>
        <td>${players[i].score.final}</td>
    </tr>`);
    }
}

export {dishMadeMold, pointing, clearKitchen, showRanking};