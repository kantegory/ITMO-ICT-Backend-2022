import BookingService from "../../services/booking"

class BookingController {
    private service = new BookingService()

    get = async (request: any, response: any) => {
        try{
            const data = await this.service.get()
            response.send(data)
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }

    post = async (request: any, response: any) => {
        try{
            const user = request.body
            await this.service.add(user.name, user.surname, user.email, user.age)
            response.send('Successfully added user')
        } catch(error: any){
            response.status(400).send(error.message)
        }
    }
}

export default BookingController