# Public Experience API
A public API to get data in Typical Developer experiences.

# Prerequisites
- Bun
- Redis
- Postgres

# Deploying
For development, use `bun deploy:dev`. For production, use `bun deploy:prod` or `bun .` The server will be accessible on `127.0.0.1:3000`.

# Using Container
The container, which is accessible by `@/setup/container`, is implemented to make usability easier. The purpose of the container is to implement methods on startup so they can be accessible across the whole project without any weird importing.

### Accessing a client
```ts
import container from `@/setup/container`;

const client = await container.database.connect();

// .. do stuff here

await client.release(); // Make sure you release the client back into the pool.
```
### Accessing the Redis instance
```ts
import container from `@/setup/container`;

const cache = await container.redis.get('key');

// .. do stuff here
```