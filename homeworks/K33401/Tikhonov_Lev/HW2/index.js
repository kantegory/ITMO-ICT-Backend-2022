const express = require('express')
const db = require('./models')

const bp = require('body-parser')
const app = express()
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/users', async (req, res) => {
    const user = await db.User.findAll()
    console.log('user is', user)
    res.send(user)
})


app.get('/users/email/:email', async (req, res) => {
    const user = await db.User.findOne({ where: { email: req.params.email }} )
    console.log('user is', user)
    res.send(user.toJSON())
})

app.get('/users/:id', async (req, res) => {
    const user = await db.User.findByPk(req.params.id)
    console.log('user is', user)
    res.send(user.toJSON())
})

app.get('/users/delete/:id', async (req, res) => {
    const user = await db.User.destroy({
            where: {
                id: req.params.id
            }
        })
    console.log('user was deleted!', user)
    res.send('user was deleted!')
})

app.put('/users/update/:id', async (req, res) => { 
    db.User.findOne({ where: {id: req.params.id}})
    .then(record => {
        if (!record) {
            throw new Error('No record found')
        } 
        let values = {
            firstNAme: req.body.firstNAme,
            lastNAme: req.body.lastNAme,
            email: req.body.email,
        }
        
        record.update(values).then( updatedRecord => {
            // login into your DB and confirm update
        })

        })
        .catch((error) => {
        //error
        throw new Error(error)
        })
        console.log('user was update')
        res.send('user was update')
    
})

app.post ('/create/', async (req,res) => {
    await db.User.create(req.body)
    console.log('user was create')
    res.send('user was create')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})