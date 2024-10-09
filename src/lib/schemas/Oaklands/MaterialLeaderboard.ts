import { z } from '@hono/zod-openapi';
import MaterialLeaderboardItem from '@/lib/schemas/Oaklands/MaterialLeaderboardItem';

const MaterialLeaderboard = z.object({
    last_update: z.date(),
    leaderboards: z.record(z.record(MaterialLeaderboardItem))
});

export type MaterialLeaderboardSchema = z.infer<typeof MaterialLeaderboard>;

export default MaterialLeaderboard;