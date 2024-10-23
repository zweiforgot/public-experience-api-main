import { createRoute } from "@hono/zod-openapi";
import { type IndividualCharacter } from "@/lib/types/experience";
import ErrorMessage from "@/lib/schemas/ErrorMessage";
import fracturedfranchise from "@/api/routes/fracturedfranchise";
import container from "@/setup/container";
import type { CharacterData } from "@/lib/types/experience";
import PNG from "@/lib/schemas/FracturedFranchise/png";
import fetch from "node-fetch";

// Define the route for getting character headshot images
const route = createRoute({
    method: "get",
    path: "/characters/media/headshot/{char_id}",
    tags: ['Media'],
    description: "Get the headshot image of a character in Fractured Franchise.",
    parameters: [
        { name: 'char_id', in: 'path', required: true }
    ],
    responses: {
        200: {
            content: {
                "image/png": { schema: PNG }
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

// Function to load the image from the URL
async function load_pic(url: string) {
    const options = {
        method: "GET"
    };

    let response = await fetch(url, options);

    if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        return buffer;
    } else {
        console.log("HTTP-Error: " + response.status);
        return null; // Ensure you return null on error
    }
}

// OpenAPI route handler for headshot images
fracturedfranchise.openapi(route, async (res) => {
    const char_id = res.req.param('char_id');

    const jsondata = await container.redis.get('characters');

    if (!jsondata) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }

    const characters = JSON.parse(jsondata);

    if (!characters) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }

    const character: IndividualCharacter = characters[char_id];

    if (!character) {
        return res.json({
            error: "NOT_FOUND",
            message: "Character not found."
        }, 404);
    }

    let str = character.Media.Headshot;
    const url = `https://assetdelivery.roblox.com/v1/asset?id=` + str.replace("rbxassetid://", "");
    const image = await load_pic(url);

    if (!image) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "Failed to load image."
        }, 500);
    }

    // Create an ArrayBuffer from the Buffer
    const arrayBuffer = new ArrayBuffer(image.length);
    const view = new Uint8Array(arrayBuffer);
    view.set(new Uint8Array(image)); // Use set instead of copy

    return res.body(arrayBuffer, 200, {
        'Content-Type': 'image/png',
    }) as any; // Cast to 'any' to satisfy TypeScript
});

export default fracturedfranchise;
