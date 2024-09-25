import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono();

app.get('/', swaggerUI({ url: '/docs/json' }));

app.doc('/docs/json', {
    openapi: "3.0.0",
    info: {
        title: "Public Experience API",
        version: "1.0.0" 
    },
    tags: [
        { name: 'Oaklands', description: 'Operations relating to Oaklands.' },
    ]
});

export default app;