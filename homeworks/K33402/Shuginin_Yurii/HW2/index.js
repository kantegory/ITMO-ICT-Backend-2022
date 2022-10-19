const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Get list of all users
app.get('/users', async (req, res) => {
  const users = await db.User.findAll()
  res.send(users)
})

// Create a new user
app.post('/users', async (req, res) => {
  const user = await db.User.create(req.body)
  res.send(user.toJSON())
})

// Update user by id
app.put('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  
  if (user) {
    await user.update(req.body, { where: { id: req.params.id } })
    res.send(user.toJSON())
  } else {
    res.status(404).send('User is not found')
  }
})

// Delete user by id
app.delete('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  
  if (user) {
    await user.destroy({ where: { id: req.params.id } })
    res.send('User deleted successfully')
  } else {
    res.status(404).send('User is not found')
  }
})

app.get('/users/id/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)

  if (user) {
    res.send(user.toJSON())
  } else {
    res.status(404).send('User is not found')
  }
})

app.get('/users/email/:email', async (req, res) => {
  const user = await db.User.findOne({
    where: {
      email: req.params.email
    }
  })

  if (user) {
    res.send(user.toJSON())
  } else {
    res.status(404).send('User is not found')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})