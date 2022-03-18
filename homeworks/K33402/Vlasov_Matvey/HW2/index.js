const express = require('express')
const db = require('./models')

const app = express()
const port = 3000

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Welcome to the app HW2!')
})


app.post('/users/create', async (req, res) => {
    if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password) return res.sendStatus(400)
    const user = await db.User.create(req.body)
    res.send(user.toJSON())
})

app.put('/users/update/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        await user.update(req.body)
        res.send(user.toJSON())
    } else {
        res.send({"error": "user is not found"})
    }
})

app.delete('/users/delete/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)

    if (user) {
        await user.destroy()
        res.sendStatus(200)
    } else {
        res.send({"error": "user is not found"})
    }
})

app.get('/users/:id', async (req, res) => {
  const user = await db.User.findByPk(req.params.id)

  if (user) {
    res.send(user.toJSON())
  } else {
    res.send({"error": "user is not found"})
  }
})

app.get('/users/email/:email', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.params.email }})

    if (user) {
      res.send(user.toJSON())
    } else {
      res.send({"error": "user is not found"})
    }
  })

app.listen(port, () => {
  console.log(`HW2 app listening on port ${port}`)
})