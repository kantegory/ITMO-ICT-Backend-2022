import express from 'express'

const app = express()
const port = 8000

app.get('/', (request, response) => {
  response.send('Hello world!')
})

app.listen(port, () => console.log(`Running on port ${port}`))
