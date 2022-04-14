const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)

  if (user) {
    res.send(user.toJSON())
  } else {
    res.send({"msg": "user is not found"})
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
    res.send({"msg": "user is not found"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})