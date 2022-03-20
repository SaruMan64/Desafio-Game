const express = require('express');
const app = express();
const port = 8001;

app.use(express.static("public"));

app.use('/opening', express.static('public/templates/opening.html'));

app.use('/game', express.static('public/jogo.html'));

app.use('/testes', express.static('public/templates/index.html'));

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`)
);