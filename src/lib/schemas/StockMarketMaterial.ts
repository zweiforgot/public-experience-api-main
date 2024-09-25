import { z } from '@hono/zod-openapi';

const StockMarketMaterial = z.object({
    name: z.string(),
    base_value: z.number(),
    current_value: z.number(),
    current_difference: z.number(),
    last_difference: z.number()
});

export type StockMarketMaterialSchema = z.infer<typeof StockMarketMaterial>;

export default StockMarketMaterial;