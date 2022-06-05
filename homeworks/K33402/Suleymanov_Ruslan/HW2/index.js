const express = require('express')
const db = require('./models')

const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

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

    res.send({"msg": "user is not found"})
})

app.get('/usersemail/:email', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.params.email } })

    console.log('user is', user)

    if (user) {
        res.send(user.toJSON())
    }

    res.send({"msg": "user is not found"})
})

app.post('/users', async (req, res) => {

    console.log(req.body)

    const user = await db.User.create(req.body)
    res.send(user.toJSON())
})
app.get('/users', async (req, res) => {
    const users = await db.User.findAll({ raw: true, nest: true })
    res.send(users)
})

app.put('/users/:id', async (req, res) => {
    let user = await db.User.findByPk(req.params.id)


    if (user) {
        await db.User.update(req.body, { where: { id: req.params.id } })

    } else { await db.User.create(req.body) }

    res.send(req.body)
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.destroy({ where: { id: req.params.id } })

    if (user) {
        respBody = { "status": "success" }
    } else { respBody = { "msg": "user not found" } }
    res.send(respBody)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})