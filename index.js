const app = require('./src/config/app')
const database = require('./src/database/myMongoose');
const { port } = require('./src/config/vars');

// Establish the database connection
database.connect();

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
