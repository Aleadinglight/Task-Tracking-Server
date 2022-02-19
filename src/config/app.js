const express = require('express');
const cors = require('cors');
const corsOptions = require('./corsOption');
const apiRoute = require('../route/apiRoute');

const app = express();
// Enable CORS
app.use(cors(corsOptions));

// Use express json parse
app.use(express.json());
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', apiRoute);

module.exports = app;
