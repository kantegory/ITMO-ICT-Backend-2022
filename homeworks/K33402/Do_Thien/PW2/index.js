const express = require('express')
const db = require('./models')
const bp = require('body-parser')

const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//create user
app.post('/users', async (req, res) => {
  const user = await db.User.create(req.body)
  console.log(req.body)
  res.send(user.toJSON())
})

// find by id
app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    console.log('user is ', user)
    res.send(user)
})

//find by email - pending
app.get('/users/email/:email', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.params.email }})
    console.log('user is ', user)
    res.send(user)
})

// get all users
app.get('/users', async (req, res) => {
    const user = await db.User.findAll(req.params)
    console.log('user is ', user)
    res.send(user)
})

// update user
app.put('/users/:id', async (req, res) => {
  let user = await db.User.findByPk(req.params.id)
  await db.User.update(req.body, { where: { id: req.params.id }})
  res.send(user)
})

// delete user
app.get('/users/delete/:id', async (req, res) => {
  const user = await db.User.destroy({ where: { id: req.params.id }})
  console.log('user was deleted!')
  res.send('User was deleted!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})