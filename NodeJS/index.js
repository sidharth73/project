const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const { mongoose } = require('./db.js');
var peopleController = require('./controllers/peopleController.js');

app.use(cors())
app.use(bodyParser.json());
app.use('/',peopleController);

app.listen(PORT,(err) => {
    if (err) {
        console.log("Error in server setup");
    }
    console.log("Server listening at Port", PORT);
})