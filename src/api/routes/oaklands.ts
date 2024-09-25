import { OpenAPIHono } from "@hono/zod-openapi";

const oaklands = new OpenAPIHono();

oaklands.get('/', (res) => res.json({ status: "OK", endpoint: res.req.path }));

export default oaklands;