import { createRoute } from "@hono/zod-openapi";
import { type IndividualCharacter } from "@/lib/types/experience";
import ErrorMessage from "@/lib/schemas/ErrorMessage";
import fracturedfranchise from "@/api/routes/fracturedfranchise";
import cache from "@/lib/cache";
import type { CharacterData }  from "@/lib/types/experience";
import Character from "@/lib/schemas/FracturedFranchise/Character";
import { getCharacters } from "@/lib/util";


const route = createRoute({
    method: "get",
    path: "/characters/character/{char_id}",
    tags: ['FracturedFranchise'],
    description: "Get information about a specific character in Fractured Franchise.",
    parameters: [
        { name: 'char_id', in: 'path', required: true }
    ],
    responses: {
        200: {
            content: {
                "application/json": { schema: Character }
            },
            description: "OK"
        },
        404: {
            content: {
                "application/json": { schema: ErrorMessage }
            },
            description: "NOT FOUND"
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
    const char_id = res.req.param('char_id');
    const characters = await getCharacters();

    if (!characters) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }

    const character: IndividualCharacter = characters[char_id];

    if (!character) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "Not found."
        }, 404);
    }

    return res.json(character, 200);
});