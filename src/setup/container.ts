import NodeCache from "node-cache";
import database from "@/lib/database";
import redis_cache from "@/lib/redis-cache";

const container = {
    database,
    cache: new NodeCache(),
    redis: redis_cache
};

export default container;