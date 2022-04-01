const db = require('./models')

async function main() {
    await db.User.create({
        firstNAme: 'Test2',
        lastNAme: 'Test2',
        email: 'thien@example.com'
    })

}

main()