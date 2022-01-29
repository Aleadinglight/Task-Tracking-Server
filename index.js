const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./src/database/myMongoose');
const taskRoute = require('./src/route/taskRoute');
require('dotenv').config();

// Import database
database();

// Configure cors options
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.set('json spaces', 2);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/tasks', taskRoute);

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
