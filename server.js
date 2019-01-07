const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(cors());
// Define the port to run on
const port = process.env.PORT || 80;


app.options('*', cors());
app.use(express.static(path.join(__dirname, 'build')));
app.get('/app/*', cors(), (req, res)=>{
    res.sendFile(path.join(__dirname, './build/index.html'));
  });

app.get('/api', cors(), (req, res)=>{
    console.log(req.query.request);
    axios.get('https://data.nba.net' + req.query.request).then( response => {
        res.send(response.data);
    })
    .catch(error => {
        console.log(error);
    }); 
});

app.get("/sitemap.xml", function(req, res){
    res.sendFile(path.join(__dirname, './build/sitemap.xml')); 
  });

// Listen for requests
app.listen(port, () => {
    console.log(path.join(__dirname, './build/'));
  console.log(`NBA is listening on: ${port}`);
});