import { OpenAPIHono } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono();

app.use('*', (ctx, next) => {
    ctx.header('Access-Control-Allow-Origin', '*');
    ctx.header('Access-Control-Allow-Methods', 'GET');
    ctx.header('Access-Control-Allow-Headers', 'Content-Type');

    return next();
});

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