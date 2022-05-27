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

    list = async (request: any, response: any) => {
        try {
            const portfolios = await this.entityService.list()
            response.send({portfolios: portfolios})
        } catch (error: any) {
            response.status(404).send({
                "error": error.message
            })
        }
    }

    create = async (request: any, response: any) => {
        try {
            const stock = await this.entityService.create(
                request.body
            )
            response.send(stock)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    exchangeMoney = async (request: any, response: any) => {
        try {
            const portfolio = await this.entityService.exchange(
                request.body
            )
            response.send(portfolio)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    buy = async (request: any, response: any) => {
        try {
            const stock = await this.entityService.buyStock(
                request.body
            )
            response.send(stock)
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    sell = async (request: any, response: any) => {
        try {
            const stock = await this.entityService.sellStock(
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
            const portfolio = await this.entityService.delete(+request.params.id)
            response.send({status: 'ok'});
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }

    update = async (request: any, response: any) => {
        try {
            const portfolio = await this.entityService.update({
                id: +request.params.id,
                ...request.body,
            })
            response.send(portfolio);
        } catch (error: any) {
            response.status(404).send({
                "error": error.message 
            })
        }
    }
}

export default PortfolioController
