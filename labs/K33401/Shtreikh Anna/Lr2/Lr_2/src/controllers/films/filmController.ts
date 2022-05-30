
import FilmService from "../../services/filmService"
import authMiddleware from "../../middleware/auth"


class FilmController {
    private filmService: FilmService
    constructor() {
        this.filmService = new FilmService()
    }
    get = async (request: any, response: any) => {
        try {
            const films = await this.filmService.getAll()
            return response.json(films);
        } catch (e: any) {
            response.status(404).send({ "error": e.message })
        }
    }
    post = async (request: any, response: any) => {
        try {
            const { body } = request
            const film = await this.filmService.create(body);
            return response.json({ film, msg: "created" })
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }
    getbyID = async (request: any, response: any) => {
        try {
            const film = await this.filmService.getById(request.params.id)
            console.log(film.ageLimit)
            let userr = await authMiddleware(request,response)
            console.log(userr.age)
            if (userr.age >= film.ageLimit) {
                return response.json(film)
            }
            else {
                response.json({ "msg": "You are not old enough to see this film." })
            } 
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    getbyTitle = async (request: any, response: any) => {
        try {
            const film = await this.filmService.getByTitle(request.params.title)
            console.log(film.ageLimit)
            let userr = await authMiddleware(request,response)
            console.log(userr.age)
            if (userr.age >= film.ageLimit) {
                return response.json(film)
            }
            else {
                response.json({ "msg": "You are not old enough to see this film." })
            } 
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    getbyGenre = async (request: any, response: any) => {
        try {
            const film = await this.filmService.getByGenre(request.params.genre)
            return response.json(film);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    getbyCountry = async (request: any, response: any) => {
        try {
            const film = await this.filmService.getByCountry(request.params.country)
            return response.json(film);
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    put = async (request: any, response: any) => {
        try {
            const { body } = request;
            const film = await this.filmService.update(request.params.id, body)
            return response.json({ film, msg: 'Successfully update film' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
    delete = async (request: any, response: any) => {
        try {
            const film = await this.filmService.delete(request.params.id)
            return response.json({ msg: 'Successfully delete film' })
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }
}


export default FilmController