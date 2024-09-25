import { getMaterialStockMarket } from "#lib/util";
import NodeCache from "node-cache";
import NodeSchedule from "node-schedule";

const cache = new NodeCache();

cache.set(
    'material_stock_market',
    await getMaterialStockMarket()
);

// Resets the stock market at 6AM.
NodeSchedule.scheduleJob('reset_stockmarket', '0 10 * * *', async () => {
    cache.set(
        'material_stock_market',
        await getMaterialStockMarket()
    );
});

export default cache;