import { Portfolio } from "../orm/models/Portfolio";
import { PortfolioStock } from "../orm/models/PortfolioStock";
import UserService from "./UserService";
import StockService from "./StockService";
import {getConnection} from "typeorm";
import { Stock } from "../orm/models/Stock";


class PortfolioService {
    public async getById(id: number): Promise<Portfolio> {
        return await getConnection().getRepository(Portfolio).findOne({ where: { id: id } }).then((portfolio) => {
            if (!portfolio) {
                throw new Error(`Portfolio (id=${id}) does not exist`);
            }
            return portfolio;
        });
    }

    public async create(portfolioData: {user_id: number}): Promise<Portfolio> {
        const user = await new UserService().getById(portfolioData.user_id);
        const entityRepo = getConnection().getRepository(Portfolio);
        
        return entityRepo.save({user: user});
    }

    private async manipulateStock(dealInfo: {portfolio_id: number, stock_id: number, isSold: boolean}) {
        const stock = await new StockService().getById(dealInfo.stock_id);
        const portfolio = await this.getById(dealInfo.portfolio_id);

        const entityRepo = getConnection().getRepository(PortfolioStock);
        
        portfolio.balance += stock.lastPrice * (dealInfo.isSold ? 1 : -1);

        return entityRepo.save({
            portfolio: portfolio,
            stock: stock,
            timestamp: +new Date(),
            price: stock.lastPrice,
            isSold: dealInfo.isSold,
        })
    }

    public async buyStock(dealInfo: {portfolio_id: number, stock_id: number}): Promise<PortfolioStock> {
        return await this.manipulateStock({...dealInfo, isSold: false});
    }

    public async sellStock(dealInfo: {portfolio_id: number, stock_id: number}): Promise<PortfolioStock> {
        return await this.manipulateStock({...dealInfo, isSold: true});
    }
}

export default PortfolioService
