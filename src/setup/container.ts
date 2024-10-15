import database from "@/lib/database";
import NodeCache from "node-cache";

const container = { database, cache: new NodeCache() };

export default container;