'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./utils/db');
const cats = require('./routes/catRouter');
const users = require('./routes/userRouter');

app.use(express.static('week2_public_html'));
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded

app.use('/cat', cats);
app.use('/user', users);

db.on('connected', () => {
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
});

