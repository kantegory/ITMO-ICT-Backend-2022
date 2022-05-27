import { Portfolio } from "../orm/models/Portfolio";
import { PortfolioStock } from "../orm/models/PortfolioStock";
import UserService from "./UserService";
import StockService from "./StockService";
import {getConnection, MinKey} from "typeorm";


class PortfolioService {
    public getPortfolioRepo() {
        return getConnection().getRepository(Portfolio);
    }

    public async getById(id: number): Promise<Portfolio> {
        return await this.getPortfolioRepo().findOne({ where: { id: id } }).then(async (portfolio) => {
            if (!portfolio) {
                throw new Error(`Portfolio (id=${id}) does not exist`);
            }
            portfolio["stocks"] = await getConnection().getRepository(PortfolioStock).find({
                where: {
                    portfolio_id: portfolio.id
                }
            });
            return portfolio;
        });
    }

    public async create(portfolioData: {name: string, user_id: number}): Promise<Portfolio> {
        const user = await new UserService().getById(portfolioData.user_id);
        const entityRepo = getConnection().getRepository(Portfolio);
        
        return entityRepo.save({user: user, name: portfolioData.name});
    }

    private async manipulateStock(dealInfo: {portfolio_id: number, stock_id: number, amount: number, isSold: boolean}): Promise<Portfolio> {
        const stock = await new StockService().getById(dealInfo.stock_id);
        const portfolio = await this.getById(dealInfo.portfolio_id);
        
        portfolio.balance += stock.lastPrice * dealInfo.amount * (dealInfo.isSold ? 1 : -1);

        if(portfolio.balance < 0) {
            throw new Error("Not enough balance")
        }
        
        // start transaction
        await getConnection().transaction(async transactionalEntityManager => {
            const stocksRepo = getConnection().getRepository(PortfolioStock);

            if(!dealInfo.isSold) {
                await stocksRepo.save({
                    portfolio: portfolio,
                    stock: stock,
                    timestamp: new Date(),
                    price: stock.lastPrice,
                    amount: dealInfo.amount,
                });
            }else {
                let amount = dealInfo.amount;
                let toRemoveStocks = [];

                for(let portfolio_stock of await stocksRepo.find({where: {
                    portfolio_id: portfolio.id, 
                    stock_id: stock.id,
                }})) {
                    if(amount == 0) {
                        break;
                    }

                    let minus_amount = Math.min(portfolio_stock.amount, amount);
                    portfolio_stock.amount -= minus_amount;
                    amount -= minus_amount;

                    stocksRepo.save(portfolio_stock)

                    if(portfolio_stock.amount == 0) {
                        toRemoveStocks.push(portfolio_stock);
                    }
                }

                if(amount > 0) {
                    throw new Error("Not enough stocks")
                }

                for(let ps of toRemoveStocks) {
                    stocksRepo.remove(ps);
                }
            }
            
            await this.getPortfolioRepo().save(portfolio);
        });


        return await this.getById(dealInfo.portfolio_id);
    }

    public async buyStock(dealInfo: {portfolio_id: number, stock_id: number, amount: number}): Promise<Portfolio> {
        return await this.manipulateStock({...dealInfo, isSold: false});
    }

    public async sellStock(dealInfo: {portfolio_id: number, stock_id: number, amount: number}): Promise<Portfolio> {
        return await this.manipulateStock({...dealInfo, isSold: true});
    }
    
    public async exchange(exchangeInfo: {portfolio_id: number, balance: number}): Promise<Portfolio> {
        const portfolio = await this.getById(exchangeInfo.portfolio_id);
        portfolio.balance += exchangeInfo.balance;
        
        return await this.getPortfolioRepo().save(portfolio);
    }

    public async delete(id: number): Promise<void> {
        const entity = await this.getById(id);
        await getConnection().getRepository(Portfolio).remove(entity);
    }

    public async list(): Promise<Portfolio[]> {
        return await getConnection().getRepository(Portfolio).find();
    }

    public async update(portfolioData: {id: number, balance: number, user_id: number}): Promise<Portfolio> {
        const user = await new UserService().getById(portfolioData.user_id);
        const portfolio = await this.getById(portfolioData.id);

        return await getConnection().getRepository(Portfolio).save({
            id: portfolioData.id,
            balance: portfolioData.balance | portfolio.balance,
            user: user,
        });
    }
}

export default PortfolioService
