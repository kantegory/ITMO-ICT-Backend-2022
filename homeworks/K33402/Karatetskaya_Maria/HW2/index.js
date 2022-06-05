const express = require('express')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('./models')

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/users/:text', async (req, res) => {
    const user = await db.User.create(req.body)
    res.send(user)
})

app.get('/users/:text', async (req, res) => {
    const user = await db.User.findAll({
        where: {            
            [Op.or]: [
                {
                    id: req.params.text
                },
                {
                    email: req.params.text
                }
            ]
        } 
    })
    if (user) {
        res.send(user)
    }

    res.send({ "msg": "user is not found" })
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
        if (user) {
            user.destroy();
            res.sendStatus(200)
    }
    res.send({ "msg": "user is not found" })
})

app.put('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    if (user) {
        await db.User.update(req.body, {
            where: {
                id: req.params.id
            }
        }
    )} else {
        await db.User.create(req.body)
    }
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})