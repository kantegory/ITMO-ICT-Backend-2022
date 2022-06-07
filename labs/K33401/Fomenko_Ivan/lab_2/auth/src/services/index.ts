import axios from "axios" 

class AuthService {
    private repo = sequelize.getRepository(User)

    add(name: string, surname:string, email:string, age: string) {
        this.repo.create({name: name, surname: surname, email: email, age: age})
    }

    get(){
        return this.repo.findAll()
    }
}

export default AuthService