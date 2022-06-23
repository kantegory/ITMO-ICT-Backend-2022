
import express from "express"
import FilmController from "../controllers/films/filmController"


const router = express.Router()

const filmController = new FilmController()

router
  .route('/films')
  .get(filmController.get)

router
  .route('/films/id/:id')
  .get(filmController.getbyID)

router
  .route('/films/genre/:genre')
  .get(filmController.getbyGenre)

router
  .route('/films/country/:country')
  .get(filmController.getbyCountry)

router
  .route('/films/title/:title')
  .get(filmController.getbyTitle)

router
  .route('/films/:id')
  .put(filmController.put)

router
  .route('/films')
  .post(filmController.post)

router
  .route('/films/:id')
  .delete(filmController.delete)

export default router