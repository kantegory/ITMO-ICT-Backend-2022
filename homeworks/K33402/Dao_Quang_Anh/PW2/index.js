const express = require('express')
const db = require('./models')
const bp = require('body-parser')
const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/user/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)
  console.log('user is', user)
  if (user) {
    res.send(user.toJSON())
  }
})

app.get('/user_email/:email', async (req, res) => {
  const user = await db.User.findOne({
    where: {
      email: req.params.email
    }  
  })
  if (user) {
    res.send(user.toJSON())
  }
})

app.get('/users', async (req, res) => {
  const users = await db.User.findAll()
  res.send(users)

})

app.delete('/delete/:id', async (req, res) => {
  const user = await db.User.destroy({
    where: {
      id: req.params.id
    } 
  })
  if (user) {
    res.send({"msg": "user deleted"})
  }
  else {
    res.send({"msg": "user not found"})
  }
})

app.put('/update/:id', async (req,res) => {
  db.User.findByPk(req.params.id)
  .then(result => {
    if (result) {
      let val = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      }
      result.update(val)
    } else { res.send({"msg": "user not found"}) }
    res.send(req.body)
  })
})

app.post('/create', async (req,res) => {
  await db.User.create(req.body)
  res.send({"msg":"user created"})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}, and host - localhost`)
})