import NodeCache from "node-cache";
import NodeSchedule from "node-schedule";
import { getMaterialStockMarket, getCurrentClassicShop } from "@/lib/util";

const cache = new NodeCache();

const cacheRunners = {
    materialStockMarket: async () => {
        const values = await getMaterialStockMarket();
        cache.set('material_stock_market', values);
    },
    classicShop: async () => {
        const values = await getCurrentClassicShop();
        cache.set('classic_shop', values);
    }
};

await Promise.all(Object.entries(cacheRunners).map(([_, func]) => func()));

NodeSchedule.scheduleJob('reset_classic_shop', '0 16 * * *', async () => 
    await Promise.all([
        cacheRunners.classicShop(),
    ])
);

NodeSchedule.scheduleJob('reset_stockmarket', '0 4,10,16,20 * * *', async () => 
    await Promise.all([
        cacheRunners.materialStockMarket()
    ])
);

export default cache;