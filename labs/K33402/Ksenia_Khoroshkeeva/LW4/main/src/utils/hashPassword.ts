import bcrypt from 'bcrypt'

export default (password: string): string => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}
