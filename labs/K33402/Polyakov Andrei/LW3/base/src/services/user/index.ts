import User from '../../models/user/User'
import { sequelize } from '../../config/config'

export default class UserService {

    private repo = sequelize.getRepository(User)
    
    add(nickname: string, name: string, surname: string, email: string, password: string) {
        this.repo.create({ nickname: nickname, name: name, surname: surname, email: email, password: password})
    }

    getAll() {
        return this.repo.findAll()
    }

    getById(id_param: number) {
        return this.repo.findOne({ where: { id: id_param }})
    }

    getByEmail(email_param: string) {
        return this.repo.findOne({ where: { email: email_param }})
    }
}