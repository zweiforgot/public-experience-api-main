import { z } from '@hono/zod-openapi';
import StockMarketMaterial from '@/lib/schemas/Oaklands/StockMarketMaterial';

const StockMarket = z.object({
    reset_time: z.date(),
    trees: z.record(StockMarketMaterial),
    rocks: z.record(StockMarketMaterial),
    ores: z.record(StockMarketMaterial)
});

export type StockMarketSchema = z.infer<typeof StockMarket>;

export default StockMarket;