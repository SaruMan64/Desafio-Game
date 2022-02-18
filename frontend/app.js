const express = require('express');
const app = express();
const port = 8001;

app.use(express.static("public"));

app.use('/first', express.static('public/abertura.html'));

app.use('/second', express.static('public/index.html'));

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`)
);