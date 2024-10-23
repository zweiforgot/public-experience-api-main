import NodeSchedule from "node-schedule";
import container from "@/setup/container";
import { getCharacters } from "@/lib/util";

const cacheRunners = {
     characters: async () => {
        const values = await getCharacters();

        container.redis.set('characters', JSON.stringify(values));
    }
};

await Promise.all(Object.entries(cacheRunners).map(([_, func]) => func()));

// Runs every 5th minute
NodeSchedule.scheduleJob('refetch_leaderboard', '*/30 * * * *', async() => 
    await Promise.all([
        cacheRunners.characters()
    ])
);
