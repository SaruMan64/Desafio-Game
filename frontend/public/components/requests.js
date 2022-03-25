import {showRanking} from "./score.js";
import {makeOrder} from "./makeOrder.js";
import { apiUrl } from "../script.js";
// import { clientOrder } from "./incomingClients.js";

//const apiUrl = "http://207.148.28.230:4444";
// const apiUrl = "http://localhost:4444";

function getOrder(numberClient, seat) {
  $.ajax({
    method: "GET",
    url: apiUrl + "/order",
    success: function (response) {
        // clientOrder(response);
        makeOrder(response, numberClient, seat);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function updateScore(name, score) {
  $.ajax({
    // Update the score
    type: "GET",
    url: `${apiUrl}/score?${name}=${score}`,
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function updateRanking() {
  $.ajax({
    type: "GET",
    url: `${apiUrl}/ranking`,
    success: function (response) {
      showRanking(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

export { getOrder, updateScore, updateRanking };
