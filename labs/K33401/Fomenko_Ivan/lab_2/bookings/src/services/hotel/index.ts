import Hotel from '../../models/hotel/Hotel'
import sequelize from '../../providers/db'

class HotelService {
    private repo = sequelize.getRepository(Hotel)

    add(name: string, surname:string, email:string, age: string) {
        this.repo.create({name: name, surname: surname, email: email, age: age})
    }

    get(){
        return this.repo.findAll()
    }
}

export default HotelService