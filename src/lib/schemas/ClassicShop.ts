import { z } from '@hono/zod-openapi';

const ClassicShop = z.object({
    reset_time: z.date(),
    items: z.string().array()
});

export type ClassicShopSchema = z.infer<typeof ClassicShop>;

export default ClassicShop;