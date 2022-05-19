import { Stock } from "../orm/models/Stock"
import { StockHistory } from "../orm/models/StockHistory";
import {getConnection} from "typeorm";


class StockService {
    public async getById(id: number): Promise<Stock> {
        return await getConnection().getRepository(Stock).findOne({ where: { id: id } }).then((stock) => {
            if (!stock) {
                throw new Error(`Stock (id=${id}) does not exist`);
            }

            return stock;
        });
    }

    public async getStockHistory(id: number) : Promise<StockHistory[]> {
        return await getConnection().getRepository(StockHistory).find({where: {id: id}}).then((stocks) => {
            stocks.sort((a, b) => a.price - b.price);
            return stocks;
        });
    }

    public async updatePrice(stockData: {id: number, newPrice: number}) {
        const historyRepo = getConnection().getRepository(StockHistory);

        const stock = await this.getById(stockData.id);
        
        await historyRepo.save({
            stock: stock,
            price: stock.lastPrice,
            timestamp: +new Date()
        })

        stock.lastPrice = stockData.newPrice;

        return await getConnection().getRepository(Stock).save(stock);
    }

    public async create(stockData: {name: string, description: string}): Promise<Stock> {
        const entityRepo = getConnection().getRepository(Stock);

        await entityRepo.findOne({ where: { name: stockData.name } }).then((stock) => {
            if (stock) {
                throw new Error('Stock with such name already exists');
            }
        });

        return entityRepo.save(stockData);
    }
}

export default StockService
