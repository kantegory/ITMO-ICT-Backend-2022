const db = require('./models')

async function main() {
    await db.User.create({
        firstNAme: 'Test1',
        lastNAme: 'Test1',
        email: 'crond@example.com'
    })

}

main()