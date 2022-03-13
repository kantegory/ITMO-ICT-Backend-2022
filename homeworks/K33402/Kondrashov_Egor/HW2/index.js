const express = require('express')
const bp = require('body-parser')
const db = require('./models')

const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/users', async (req, res) => {
    // Create user
    const user = await db.User.create(req.body)
    res.send(user.toJSON())
})


app.get('/users', async (req, res) => {
    // List of users
    const users = await db.User.findAll({ raw: true, nest: true })
    res.send(users)
})

app.get('/users/:uuid', async (req, res) => {
    // Retrieve user by uuid
    const user = await db.User.findByPk(req.params.uuid)
    if (user) {
        respBody = user.toJSON()

    } else { respBody = { "msg": "user not found" } }
    res.send(respBody)
})

app.put('/users/:uuid', async (req, res) => {
    // Update user
    let user = await db.User.findByPk(req.params.uuid)
    if (user) {
        await db.User.update(req.body, { where: { uuid: req.params.uuid } })

    } else { await db.User.create(req.body) }
    res.send(req.body)
})

app.delete('/users/:uuid', async (req, res) => {
    // Delete user by uuid
    const user = await db.User.destroy({ where: { uuid: req.params.uuid } })
    if (user) {
        respBody = { "status": "success" }
    } else { respBody = { "msg": "user not found" } }
    res.send(respBody)
})

app.get('/users/:email', async (req, res) => {
    // Retreive user by email
    const user = await db.User.findOne({ where: { email: req.params.email } })
    let respBody = null

    if (user) {
        respBody = user.toJSON()

    } else { respBody = { "msg": "user not found" } }
    res.send(respBody)
})

app.listen(port, () => {
    console.log(`Starting local server on port ${port}`)
})
