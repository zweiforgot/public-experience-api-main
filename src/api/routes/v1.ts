import { OpenAPIHono } from "@hono/zod-openapi";
import fracturedfranchise from "@/api/routes/fracturedfranchise";

const v1 = new OpenAPIHono();

v1.get('/', (res) => res.json({ status: "OK", endpoint: res.req.path }));
v1.route('/fracturedfranchise', fracturedfranchise);

export default v1;