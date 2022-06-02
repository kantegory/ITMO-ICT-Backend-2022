const db = require('./models')

async function main() {
    await db.User.create({
        firstNAme: 'Test4',
        lastNAme: 'Test4',
        email: 'test4@example.com'
    })
}

main()