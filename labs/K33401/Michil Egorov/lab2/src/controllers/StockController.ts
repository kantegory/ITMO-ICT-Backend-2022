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
    
    list = async (request: any, response: any) => {
        try {
            const stocks = await this.stockService.list(
                request.params.at_least | 0
            )
            response.send(stocks)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message
            })
        }
    }

    getStockHistory = async (request: any, response: any) => {
        try {
            const stocks = await this.stockService.getStockHistory(
                +request.params.id
            )
            response.send(stocks)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    create = async (request: any, response: any) => {
        try {
            const stock = await this.stockService.create(
                request.body
            )
            response.send(stock)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    updatePrice = async (request: any, response: any) => {
        try {
            const stock = await this.stockService.updatePrice(
                request.body
            )
            response.send(stock)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    delete = async (request: any, response: any) => {
        try {
            const stock = await this.stockService.delete(+request.params.id)
            response.send({status: 'ok'});
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const stock = await this.stockService.update({
                id: +request.params.id,
                ...request.body,
            })
            response.send(stock);
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }
}

export default StockController
