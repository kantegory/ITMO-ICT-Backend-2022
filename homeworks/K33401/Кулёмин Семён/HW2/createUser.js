const db = require('./models')

async function main() {
    await db.User.create({
        firstName: 'Test3',
        lastName: 'Test3',
        email: 'test3@example.com'
    })
}

main()
