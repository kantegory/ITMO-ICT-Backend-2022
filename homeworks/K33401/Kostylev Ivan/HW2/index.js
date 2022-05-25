const express = require('express')
// import express from 'express'
const db = require('./models')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Homework 2')
})

app.get('/users', async (req, res) => {
    const users = await db.User.findAll()
    res.send(users)
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await db.User.findByPk(req.params.id)
        res.send(user.toJSON())
    } catch (err) {
        res.status(404).send({'error_code': 'user_not_found'})
    }
})

app.get('/users/age/:age', async (req, res) => {
    const users = await db.User.findAll({ where: { age: req.params.age } })
    if (users[0]) { 
        res.send(users)
    } else {
        res.status(404).send({'error_code': 'user_not_found'})
    }
})

app.post('/users', async (req, res) => {
    try {
        const user = await db.User.create(req.body)
        res.send(user.toJSON())
    } catch (err) {
        res.status(500).send({'error_code': 'internal_error', 'error': err.message});
    }
})

app.put('/users/:id', async (req, res) => {
    const num = await db.User.update(req.body, { where: { id: req.params.id } })
    if (num == 1) {
        res.send({'status_code': 'user_updated'})
    } else {
        res.status(404).send({'error_code': 'user_not_found'})
    }
})

app.delete('/users/:id', async (req, res) => {
    const user = await db.User.destroy({ where: { id: req.params.id } })
    if (user) {
        res.send({'status_code': 'user_deleted'})
    } else {
        res.status(404).send({'error_code': 'user_not_found'})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
