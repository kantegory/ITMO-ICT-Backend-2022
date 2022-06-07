import Booking from '../../models/booking/Booking'
import sequelize from '../../providers/db'

class BookingService {
    private repo = sequelize.getRepository(Booking)

    add(name: string, surname:string, email:string, age: string) {
        this.repo.create({name: name, surname: surname, email: email, age: age})
    }

    get(){
        return this.repo.findAll()
    }
}

export default BookingService