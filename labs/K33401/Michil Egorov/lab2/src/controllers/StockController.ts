import StockService from '../services/StockService'


class StockController {
    private stockService: StockService

    constructor() {
        this.stockService = new StockService()
    }

    get = async (request: any, response: any) => {
        try {
            const stock = await this.stockService.getById(
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

export default StockController
