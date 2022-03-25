const cors = require("cors");
const express = require("express");
const app = express();
const port = 4444;
const fs = require("fs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const getOrder = require("./modules/getOrder.js");
const register = require("./modules/register.js");
const score = require("./modules/score.js");
const ranking = require("./modules/ranking.js");
const check = require("./modules/check.js");

app.get("/order", (req, res) => {
  res.send(getOrder.getOrder());
});

// app.post("/register", (req, res) => {
//     const player = req.body;
//     player.score = 0;
//     fs.writeFile('./players.json', JSON.stringify(player, null, 2), (err, result) => {
//         console.log(err);
//     });
// });

app.get("/register", function(req, res) {
  const name = Object.values(req.query)[0];
  const newPlayer = register(name);
  res.send(newPlayer);
});

app.get("/check", function(req, res) {
  // res.send(req.query);
  res.send(check(req.query.name));
});

app.get("/score", function(req, res) {
  const name = Object.keys(req.query)[0];
  const pointing = Number(Object.values(req.query)[0]);
  const setScore = score(name, pointing);
  res.send(setScore);
});

app.get("/ranking", function(req, res) {
  const rank = ranking();
  res.send(rank);
})

/*
app.put("/:id", (req, res) => {

});

app.delete("/:id", (req, res) => {
  
});*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
