import { request } from "http"
import BookServices from "../../services/Booking/index"
import { Booking } from '../../model/Booking/booking';
import UserError from '../../errors/users/index';
class BookController {
    private BookService: BookServices

    constructor() {
        this.BookService = new BookServices()
    }

    create = async(request: any, response: any) => {
        const { body } = request
        try {
          const user : Booking|UserError = await this.BookService.create(body)
          response.status(201).send(user)
        } catch (error: any) {
          console.log(error)
          response.status(404).send({ "error": error.message})
        }
      }
    getall = async(request: any, response: any) => {
        const data = await this.BookService.getall(request.user.id)
        response.status(201).send(data)
    }
}
export default BookController
