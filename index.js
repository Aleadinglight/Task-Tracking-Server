const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json());
app.set('json spaces', 2)

app.get("/", (req, res) => {
  res.send('Hello World!')
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})