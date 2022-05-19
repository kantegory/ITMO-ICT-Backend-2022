import PortfolioService from '../services/PortfolioService'


class PortfolioController {
    private entityService: PortfolioService

    constructor() {
        this.entityService = new PortfolioService()
    }

    get = async (request: any, response: any) => {
        try {
            const stock = await this.entityService.getById(
                +request.params.id
            )
            response.send(stock)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }
}

export default PortfolioController
