const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000 // running at port 5000, because react will run at port 3000

app.use(express.json());

// Available Routes: these are the available routes that are application will have
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)  // at this port the app will listen
})