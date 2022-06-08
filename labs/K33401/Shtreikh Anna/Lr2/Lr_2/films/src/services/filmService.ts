import Film from '../db/models/film';

class FilmService {
    async getAll(){
        const films = await Film.findAll()

        if (films) return films
        else return { "message": "films not found" }

    }
    async getById(id: number) {
        const film = await Film.findByPk(id)

        if (film) return film

        throw new Error(`film with id ${id} not found`)
    }

    async getByTitle(title: string) {
        const film = await Film.findOne({ where: { title: title } })

        if (film) return film

        throw new Error(`film named ${title} not found`)
    }

    async getByGenre(genre: string) {
        const film = await Film.findAll({ where: { genre: genre } })

        if (film) return film

        throw new Error(`films in genre ${genre} not found`)
    }

    async getByCountry(country: string) {
        const film = await Film.findAll({ where: { country: country } })

        if (film) return film

        throw new Error(`films from ${country} not found`)
    }

    async create(filmInfo: any) {
        try {
            const newfilm = await Film.create(filmInfo)
            return newfilm
        } catch (e: any) {
            throw new Error(e)
        }
    }
    
    async update(id:number, data: any) {
        try {
            const film = await Film.findByPk(id)
            if (film) {
                film.update(data)
            }
            return film
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id:number) {
        try {
            await Film.destroy({where: {id:id}})
        } catch (e: any) {
            throw new Error(e)
        }
    }

}

export default FilmService 