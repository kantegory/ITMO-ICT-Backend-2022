import { Stock } from "../orm/models/Stock"
import { StockHistory } from "../orm/models/StockHistory";
import {getConnection, MoreThan} from "typeorm";


class StockService {
    private async addHistory(stock) : Promise<StockHistory> {
        const historyRepo = getConnection().getRepository(StockHistory);
        return await historyRepo.save({
            stock: stock,
            price: stock.lastPrice,
            timestamp: new Date()
        })
    }

    public async getById(id: number): Promise<Stock> {
        return await getConnection().getRepository(Stock).findOne({ where: { id: id } }).then((stock) => {
            if (!stock) {
                throw new Error(`Stock (id=${id}) does not exist`);
            }

            return stock;
        });
    }

    public async getStockHistory(stock_id: number) : Promise<StockHistory[]> {
        return await getConnection().getRepository(StockHistory).find({where: {stock_id: stock_id}}).then((stocks) => {
            return stocks;
        });
    }

    public async updatePrice(stockData: {id: number, newPrice: number}) {
        const stock = await this.getById(stockData.id);        
        stock.lastPrice = stockData.newPrice;

        this.addHistory(stock);
        return await getConnection().getRepository(Stock).save(stock);
    }

    public async create(stockData: {name: string, description: string, lastPrice: number}): Promise<Stock> {
        const entityRepo = getConnection().getRepository(Stock);

        await entityRepo.findOne({ where: { name: stockData.name } }).then((stock) => {
            if (stock) {
                throw new Error('Stock with such name already exists');
            }
        });
        
        const created_at = new Date();
        const stock = await entityRepo.save({...stockData, created_at: created_at});
        this.addHistory(stock);
        
        return stock;
    }

    public async delete(id: number): Promise<void> {
        const entity = await this.getById(id);
        await getConnection().getRepository(Stock).remove(entity);
    }

    public async list(at_least: Date): Promise<Stock[]> {
        return await getConnection().getRepository(Stock).find({
            where: { created_at: MoreThan(at_least)}
        });
    }

    public async update(stockData: {id: number, name: string, description: string}): Promise<Stock> {
        return await getConnection().getRepository(Stock).save({
            ...stockData
        });
    }
}

export default StockService
