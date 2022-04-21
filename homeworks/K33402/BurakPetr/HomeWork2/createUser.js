const db = require('./models')

async function main() {
  await db.User.create({
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@example.com',
    age: 21,
    role: 'Male'
  })
}

main()