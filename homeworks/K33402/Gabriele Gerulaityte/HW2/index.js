const express = require('express')
const bodyParser = require('body-parser');
const db = require('./models')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  console.log('user is', user)
  if (user) {
    res.send(user.toJSON())
  }
  else {
    res.send({"msg": "user not found"})
  }
})

app.get('/user/email/:email', async (req, res) => {
  const user = await db.User.findOne({
    where: {
      email: req.params.email
    }  
  })
  if (user) {
    res.send(user.toJSON())
  }
  else {
    res.send({"msg": "user not found"})
  }
})

app.get('/users', async (req, res) => {
  const users = await db.User.findAll()
  res.send(users)

})

app.post('/create', async (req,res) => {
  const user = await db.User.create(req.body)
  res.send(user.toJSON())
})

app.put('/update/:id', async (req,res) => {
  const user = await db.User.findByPk(req.params.id)
  if (user) {
      await user.update(req.body)
      res.send(user.toJSON())
  } else {
      res.send({"msg": "user is not found"})
  }
})

app.delete('/delete/:id', async (req, res) => {
  const user = await db.User.destroy({ where: { id: req.params.id } })
  if (user) {
    res.send({"msg": "user deleted"})
  }
  else {
    res.send({"msg": "user not found"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})