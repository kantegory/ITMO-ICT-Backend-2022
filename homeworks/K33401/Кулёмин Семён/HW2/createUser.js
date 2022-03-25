const db = require('./models')

async function main() {
    await db.User.create({
        username: 'test3',
        password: 'password',
        firstName: 'Test3',
        lastName: 'Test3',
        email: 'test3@example.com',
        hometown: 'Kukuevo'
    })
}

main()
