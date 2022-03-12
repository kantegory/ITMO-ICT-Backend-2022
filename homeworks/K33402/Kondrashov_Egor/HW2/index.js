const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users/:email', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.params.email } })
    let resp = null;

    if (user) {
        resp = user.toJSON()

    } else { resp = { "msg": "user not found" } }
    res.send(resp)
})

app.listen(port, () => {
    console.log(`Starting local server on port ${port}`)
})
