const express = require('express')
const bodyParser = require("body-parser");
const db = require('./models')

const app = express()
const port = 3002

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/users', async (req, res) => {
  const user = await db.User.create(req.body)
  res.send(user.toJSON())
})

app.get('/users', async (req, res) => {
  const users = await db.User.findAll()
  res.send(users)
})

app.get('/users/id/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)

  console.log('user is', user)

  if (user) {
    respBody = user.toJSON()

  }
  else {
    respBody = { "msg": "user not found" }
  }
  res.send(respBody)
})

app.get('/users/email/:email', async (req, res) => {
  const user = await db.User.findOne({ where: { email: req.params.email } })
  if (user) {
    respBody = user.toJSON()

  }
  else {
    respBody = { "msg": "user not found" }
  }
  res.send(respBody)
})

app.put('/users/:id', async (req, res) => {
  const num = await db.User.update(req.body, { where: { id: req.params.id } })
  if (num == 1) {
    respBody = { "status": "success" }
  } else {
    respBody = { "msg": "user not found" }
  }
  res.send(respBody)
})

app.delete('/users/:id', async (req, res) => {
  const user = await db.User.destroy({ where: { id: req.params.id } })
  if (user) {
    respBody = { "status": "success" }
  } else
   { 
     respBody = { "msg": "user not found" }
    }
  res.send(respBody)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})