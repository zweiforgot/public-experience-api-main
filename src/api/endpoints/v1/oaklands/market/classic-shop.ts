import { createRoute } from "@hono/zod-openapi";
import oaklands from "@/api/routes/oaklands";
import ClassicShop, { type ClassicShopSchema } from "@/lib/schemas/Oaklands/ClassicShop";
import ErrorMessage from "@/lib/schemas/ErrorMessage";
import cache from "@/lib/cache";

const example: ClassicShopSchema = {
    reset_time: new Date("2024-10-02T16:00:00.000Z"),
    items: [
      "TeamFlag",
      "BabyDucky",
      "ClassicJeepVehiclePad",
      "TobascoSauce",
      "Oakpiece",
      "BloxyCola",
      "Trowel",
      "WitchesBrew",
      "StudGift",
      "CannedBeans",
      "SubspaceTripmine",
      "RocketLauncher"
    ]
}

const route = createRoute({
    method: "get",
    path: "/classic-shop",
    tags: ['Oaklands'],
    description: "",
    responses: {
        200: {
            content: {
                "application/json": { schema: ClassicShop, example }
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

oaklands.openapi(route, async (res) => {
    const items = cache.get<string[]>('classic_shop');
    
    if (!items) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }

    const reset = new Date();
    reset.setUTCHours(reset.getUTCHours() >= 16 ? 4 : 16, 0, 0, 0);

    return res.json({
        reset_time: reset,
        items
    }, 200);
})