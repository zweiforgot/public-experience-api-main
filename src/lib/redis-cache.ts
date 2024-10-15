import { createClient } from "redis";

const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_HOST } = process.env;

const redis_cache = createClient({
    url: `redis://${REDIS_USERNAME}:${REDIS_PASSWORD}@${REDIS_HOST}`
});

await redis_cache.connect();

export default redis_cache;
