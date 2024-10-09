import { createRoute } from "@hono/zod-openapi";
import MaterialLeaderboard, { type MaterialLeaderboardSchema } from "@/lib/schemas/Oaklands/MaterialLeaderboard";
import ErrorMessage from "@/lib/schemas/ErrorMessage";
import oaklands from "@/api/routes/oaklands";
import cache from "@/lib/cache";

const route = createRoute({
    method: "get",
    path: "/current-material-leaderboard",
    tags: ['Oaklands'],
    description: "Get today\'s current material leaderboard. The leaderboard resets daily at 12PM UTC.",
    responses: {
        200: {
            content: {
                "application/json": { schema: MaterialLeaderboard }
            },
            description: "OK"
        },
        500: {
            content: {
                "application/json": { schema: ErrorMessage }
            },
            description: "INTERNAL ERROR"   
        }
    }
});

oaklands.openapi(route, async (res) => {
    const items = cache.get<MaterialLeaderboardSchema>('material_leaderboard');

    if (!items) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }

    return res.json({
        reset_time: items.reset_time,
        last_update: items.last_update,
        leaderboards: items.leaderboards
    }, 200);
});