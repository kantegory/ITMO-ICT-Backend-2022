const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})
// create
app.post('/users', async (req, res) => {
    const user = await db.User.create(req.body)
    res.send(user.toJSON())
})
// update
app.get('users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        await db.User.update(req.body, {
            where: {
                id: req.params.id
            }
        })
    } else {
        await db.User.create(req.body)
    }
    res.send(req.body)
})
// delete
app.delete('users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        user.destroy();
        res.sendStatus(200).send({'msg': 'user deleted'})
    }
    res.status(404).send({'msg': 'user not found'})
})
//search by id
app.get('/users/id/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        res.send(user.toJSON())
    }
    res.status(404).send({'msg': 'user not found'})
})
//search by email
app.get('/users/email/:email', async (req, res) => {
    const user = await db.User.findOne({
        where: {
            email: req.params.email
        }
    })
    if (user) {
        res.send(user.toJSON())
    }
    res.status(404).send({'msg': 'user not found'})
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})