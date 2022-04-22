const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Anna',
    lastName: 'Shtreikh',
    email: 'e@example.com',
    password: "123",
    age: 20,
    country: 'Russia'
  })
}

main()