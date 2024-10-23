import { OpenAPIHono } from "@hono/zod-openapi";

const fracturedfranchise = new OpenAPIHono();

fracturedfranchise.get('/', (res) => res.json({ status: "OK", endpoint: res.req.path }));

export default fracturedfranchise;