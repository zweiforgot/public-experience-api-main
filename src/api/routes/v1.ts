import { OpenAPIHono } from "@hono/zod-openapi";
import oaklands from "./oaklands";

const v1 = new OpenAPIHono();

v1.get('/', (res) => res.json({ status: "OK", endpoint: res.req.path }));
v1.route('/oaklands', oaklands);

export default v1;