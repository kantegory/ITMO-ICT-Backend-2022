import bcrypt from 'bcrypt'

export default (password: string) : string => password.startsWith("$2b$")? password : bcrypt.hashSync(password, bcrypt.genSaltSync(8))