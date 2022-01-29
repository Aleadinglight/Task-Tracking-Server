const express = require('express');
const cors = require('cors');
const database = require('./src/database/myMongoose');
const taskRoute = require('./src/route/taskRoute');
const corsOptions = require('./src/config/corsOption');

// Establish the database connection
database.connect();

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.set('json spaces', 2);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/tasks', taskRoute);

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
