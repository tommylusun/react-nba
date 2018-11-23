const path = require('path');
const express = require('express');

const app = express();

// Define the port to run on
const port = 9090;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './build/index.html'));
  });

// Listen for requests
app.listen(port, () => {
    console.log(path.join(__dirname, './build/'));
  console.log(`NBA is listening on: ${port}`);
});