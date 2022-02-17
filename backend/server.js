const cors = require("cors");
const express = require("express");
const app = express();
const port = 4444;

app.use(cors());
app.use(express.json());

const getOrder = require("./modules/getOrder.js");

app.get("/order", (req, res) => {
  res.send(getOrder.getOrder());
});

app.post("/register", (req, res) => {
    const player = req.body;
    player.score = 0;
    fs.writeFile('./players.json', JSON.stringify(player, null, 2), (err, result) => {
        console.log(err);
    });
});

app.put("/:id", (req, res) => {

});

app.delete("/:id", (req, res) => {
  
});*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
