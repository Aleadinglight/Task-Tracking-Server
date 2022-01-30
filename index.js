const express = require('express');
const cors = require('cors');
const database = require('./src/database/myMongoose');
const taskRoute = require('./src/route/taskRoute');
const corsOptions = require('./src/config/corsOption');
const { port } = require('./src/config/vars');

// Establish the database connection
database.connect();

const app = express();

// Enable CORS
app.use(cors(corsOptions));

// Use express json parse
app.use(express.json());
app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/tasks', taskRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
