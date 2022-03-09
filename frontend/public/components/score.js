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
    } else if(Math.abs(dishOrdered.cookingTime - dishMade.cookingTime) <= 2) {
        cookingScore = 50 - (3 * (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime)));
    } else if(Math.abs(dishOrdered.cookingTime - dishMade.cookingTime) <= 10) {
        cookingScore = 50 - (5 * (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime)));
    } else {
        cookingScore = 0;
    }

    if(dishMade.broth.includes(dishOrdered.broth)) { // Calculate broth score
        brothScore = 50;
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
                if (ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1] === 0) { // If the amount of the ingredient is right, increment the amount multiplied by 10
                    ingredientsScore += 10 * ingredientsDishOrdered[i][1];
                } else {
                    if (ingredientsDishOrdered[i][1] > ingredientsDishMade[j][1]) { // If ingredient is missing, decrement the difference multiplied by 10
                        ingredientsScore += 10 * ingredientsDishMade[j][1];
                        ingredientsScore -= 10 * (ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1]);
                    } else { // If you have too many ingredients, decrement the surplus multiplied by 10
                        ingredientsScore += 10 * ingredientsDishOrdered[i][1];
                        ingredientsScore -= 10 * (ingredientsDishMade[j][1] - ingredientsDishOrdered[i][1]);
                    }
                }
                counterIngredientsDishMade += ingredientsDishMade[j][1];
            }
        }
    }
    ingredientsScore -= 10 * (dishMade.quantIngredients - counterIngredientsDishMade); // If the ingredient was not ordered, decrement the amount multiplied by 10
    if(ingredientsScore < 0) ingredientsScore = 0;

    clearDishMade(dishMade);

    orderScore = cookingScore + brothScore + ingredientsScore;
    totalScore += orderScore;
    return {cookingScore, brothScore, ingredientsScore, orderScore, totalScore};
}

function clearDishMade(dishMade) {
    dishMade.broth = "";
    dishMade.cookingTime = 0;
    dishMade.quantIngredients = 0;
    dishMade.ingredients.carrot = 0;
    dishMade.ingredients.chashu = 0;
    dishMade.ingredients.chicken = 0;
    dishMade.ingredients.egg = 0;
    dishMade.ingredients.mnema = 0;
    dishMade.ingredients.moyashi = 0;
    dishMade.ingredients.naruto = 0;
    dishMade.ingredients.nori = 0;
    dishMade.ingredients.porkrib = 0;
    dishMade.ingredients.radish = 0;
    dishMade.ingredients.shitake = 0;
    dishMade.ingredients.tofu = 0;
}


function showRanking(players) { // Create the ranking in html
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
        <td>${players[i].score}</td>
    </tr>`);
    }
}

function clearKitchen() { // Remove the dish made and the current order
    $("#box").css("background-image", "url(./images/others/box.png)");
    $("#droppable").html("");
    $("#order-drop").html("");
}

export {dishMadeMold, pointing, clearKitchen, showRanking};