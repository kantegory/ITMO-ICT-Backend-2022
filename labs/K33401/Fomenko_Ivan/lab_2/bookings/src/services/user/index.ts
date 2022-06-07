import { where } from 'sequelize/types'
import User from '../../models/user/User'
import sequelize from '../../providers/db'

class UserService {
    private repo = sequelize.getRepository(User)

    add(name: string, surname:string, email:string, password: string, age: number) {
        this.repo.create({name: name, surname: surname, email: email, password: password, age: age})
    }

    getAll(){
        return this.repo.findAll()
    }

    getByEmail(user_email: string){
        return this.repo.findOne({where : {email: user_email}})
    }
}

export default UserService