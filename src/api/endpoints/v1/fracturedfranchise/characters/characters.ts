import { createRoute } from "@hono/zod-openapi";
import Characters, {type CharactersSchema} from "@/lib/schemas/FracturedFranchise/Characters";
import ErrorMessage from "@/lib/schemas/ErrorMessage";
import fracturedfranchise from "@/api/routes/fracturedfranchise";
import { getCharacters } from "@/lib/util";

const route = createRoute({
    method: "get",
    path: "/fracturedfranchise",
    tags: ['FracturedFranchise'],
    description: "Get information about every character in Fractured Franchise.",
    responses: {
        200: {
            content: {
                "application/json": { schema: Characters}
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
    const characters = await getCharacters();

    if (!characters) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }
    
    return res.json({ characters }, 200);
});