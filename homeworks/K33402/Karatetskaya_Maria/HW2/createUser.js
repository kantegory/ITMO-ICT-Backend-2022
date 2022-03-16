const db = require('./models')

async function main() {
    await db.User.create({
        firstName: 'Test2',
        lastName: 'Test2',
        email: 'test2@example.com',
        town: 'Moskow',
        dateBirth: '2001-01-17'
    })
}

main()