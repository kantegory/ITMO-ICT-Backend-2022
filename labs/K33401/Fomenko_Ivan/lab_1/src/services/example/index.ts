import User from '../../models/users/User'
import sequelize from '../../providers/db'

class DefaultService {
    private repo = sequelize.getRepository(User)

    add(name: string, surname:string, email:string, age: string) {
        this.repo.create({name: name, surname: surname, email: email, age: age})
    }

    get(){
        return this.repo.findAll()
    }
}

export default DefaultService