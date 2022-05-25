const db = require('./models')

async function main() {
    await db.User.create({
        firstName: "Ivan",
        lastName: "Ivanovich",
        email: "ivanivanych@gmail.com",
        address: "Metallistov",
        age: 20
    })
}

main()
