import database from "@/lib/database";
import redis_cache from "@/lib/redis-cache";

const container = {
    database,
    redis: redis_cache
};

export default container;