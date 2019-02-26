const express = require('express')
const app = express()
const port = 3000

app.use(express.static('app'))
app.get('/', (req, res) => res.sendFile('home.html', { root: __dirname + "/app"}))

app.listen(port, () => console.log(`Board Games on Port: ${port}!`))
