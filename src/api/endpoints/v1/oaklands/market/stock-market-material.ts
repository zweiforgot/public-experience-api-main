import { createRoute } from "@hono/zod-openapi";
import type { BaseMaterial, MaterialStockMarket } from "@/lib/types/experience";
import StockMarketMaterial, { type StockMarketMaterialSchema } from "@/lib/schemas/Oaklands/StockMarketMaterial";
import oaklands from "@/api/routes/oaklands";
import ErrorMessage from "@/lib/schemas/ErrorMessage";
import cache from "@/lib/cache";

const example: StockMarketMaterialSchema = {
    name: "Raw Petrified Oak",
    base_value: 1.75,
    current_value: 1.4525,
    current_difference: 0.83,
    last_difference: 0.8
};

const route = createRoute({
    method: "get",
    path: "/stock-market/{material_type}",
    tags: ['Oaklands'],
    description: "Fetch the current material stock market values.",
    parameters: [
        { name: 'material_type', in: 'path', required: true }
    ],
    responses: {
        200: {
            content: {
                "application/json": { schema: StockMarketMaterial, example }
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

oaklands.openapi(route, async (res) => {
    const materialType = res.req.param('material_type');
    const items = cache.get<MaterialStockMarket>('material_stock_market');

    if (!items) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }

    const materials = Object.values(items)
        .reduce<Record<string, BaseMaterial>>((acc, curr) => ({ ...acc, ...curr }), {});
    const material = materials[materialType];

    if (!material) {
        return res.json({
            error: "INVALID_MATERIAL",
            message: "The requested material is invalid."
        }, 404);
    }

    return res.json(material, 200);
});