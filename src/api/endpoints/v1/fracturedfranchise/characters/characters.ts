import { createRoute } from "@hono/zod-openapi";
import Characters, { type CharactersSchema } from "@/lib/schemas/FracturedFranchise/Characters";
import ErrorMessage from "@/lib/schemas/ErrorMessage";
import fracturedfranchise from "@/api/routes/fracturedfranchise";
import container from "@/setup/container";

const route = createRoute({
    method: "get",
    path: "/characters",
    tags: ['FracturedFranchise'],
    description: "Get information about every character in Fractured Franchise.",
    responses: {
        200: {
            content: {
                "application/json": { schema: Characters }
            },
            description: "OK"
        },
        500: {
            content: {
                "application/json": { schema: ErrorMessage }
            },
            description: "INTERNAL ERROR"   
        }
    }
});

fracturedfranchise.openapi(route, async (res) => {
    if (!(await container.redis.exists('characters'))) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "The contents of this endpoint are currently not cached. Please wait and try again."
        }, 500);
    }

    const characters: CharactersSchema = JSON.parse((await container.redis.get('characters'))!)

    return res.json(characters, 200);
});