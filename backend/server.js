const cors = require("cors");
const express = require("express");
const app = express();
const port = 4444;

app.use(cors());
app.use(express.json());

/*app.get("/", (req, res) => {

});

app.post("/", (req, res) => {
  
});

app.put("/:id", (req, res) => {

});

app.delete("/:id", (req, res) => {
  
});*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
