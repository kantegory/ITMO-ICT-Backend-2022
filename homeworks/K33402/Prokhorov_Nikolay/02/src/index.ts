import express from 'express'
import { User } from './models/user'
import { useSequelizeErrors } from "./utils/useSequelizeErrors";

const app = express()
const port = 8080

app.use(express.json())

app.get('/', async (req, res) => {
  res.send('My awesome typescript express sequelize app!')
})

app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.send(user.toJSON())
  } catch (e) {
    console.error(e)
    const error = useSequelizeErrors(e)
    res.status(400).send(error)
  }
})

app.get('/users', async (req, res) => {
  const users = await User.findAll()
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.send(user.toJSON())
  } else {
    res.status(404).send({ msg: 'user is not found' })
  }
})

app.get('/users/email/:email', async (req, res) => {
  const user = await User.findOne({ where: { email: req.params.email } })
  if (user) {
    res.send(user.toJSON())
  } else {
    res.status(404).send({ msg: 'user is not found' })
  }
})

app.put('/users/:id', async (req, res) => {
  const [num] = await User.update(req.body, { where: { id: req.params.id } })
  if (num === 1) {
    res.send({ msg: 'user updated' })
  } else {
    res.status(404).send({ msg: 'user is not found' })
  }
})

app.delete('/users/:id', async (req, res) => {
  const user = await User.destroy({ where: { id: req.params.id } })
  if (user) {
    res.send({ msg: 'user deleted' })
  } else {
    res.status(404).send({ msg: 'user is not found' })
  }
})

app.listen(port, () => console.log(`Running on port ${port}`))
