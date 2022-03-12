const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Starting local server on port ${port}`)
})
