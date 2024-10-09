import { z } from '@hono/zod-openapi';

const MaterialLeaderboardItem = z.object({
    position: z.number(),
    name: z.string(),
    value: z.number()
});

export type MaterialLeaderboardItemSchema = z.infer<typeof MaterialLeaderboardItem>;

export default MaterialLeaderboardItem;