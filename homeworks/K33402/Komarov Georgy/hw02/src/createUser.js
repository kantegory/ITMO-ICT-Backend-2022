const db = require('./models')

async function main() {
  await db.User.create({
    lastName: 'Testov',
    firstName: 'Test',
    middleName: 'Testovich',
    email: 'test@example.com',
    age: 20,
  })
}

main()
