import { z } from '@hono/zod-openapi';
import StockMarketMaterial from '@/lib/schemas/StockMarketMaterial';

const StockMarket = z.object({
    trees: z.record(StockMarketMaterial),
    rocks: z.record(StockMarketMaterial),
    ores: z.record(StockMarketMaterial)
});

export type StockMarketSchema = z.infer<typeof StockMarket>;

export default StockMarket;