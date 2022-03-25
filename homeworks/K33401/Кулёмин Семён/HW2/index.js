const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    console.log('user is', user)

    if (user) {
        res.send(user.toJSON())
    }

    res.send({'msg': 'user is not found'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}, and host - localhost`)
})