import { createRoute } from "@hono/zod-openapi";
import { MemoryStoresApi } from "openblox/cloud";
import type { BaseMaterial, StockMarketMemoryStore } from "#lib/types";
import StockMarketMaterial, { type StockMarketMaterialSchema } from "#lib/schemas/StockMarketMaterial";
import oaklands from "#api/routes/oaklands";
import ErrorMessage from "#lib/schemas/ErrorMessage";

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
    
    const items = await MemoryStoresApi.sortedMapItem<StockMarketMemoryStore>({
        universeId: 3666294218,
        sortedMap: "MaterialValues",
        itemId: "MaterialStockMarket"
    });

    if (!items.response.success) {
        return res.json({
            error: "INTERNAL_ERROR",
            message: "There was an internal error when requesting."
        }, 500);
    }

    const materials = Object.values(items.data.value.Values)
        .reduce<Record<string, BaseMaterial>>((acc, curr) => ({ ...acc, ...curr }), {});
    const material = materials[materialType];

    if (!material) {
        return res.json({
            error: "INVALID_MATERIAL",
            message: "The requested material is invalid."
        }, 404);
    }

    return res.json({
        name: materialType.split('_').map((v) => v.charAt(0).toUpperCase() + v.substring(1)).join(' '),
        base_value: material.BasePrice,
        current_value: material.Price,
        current_difference: material.CurrentPercentage,
        last_difference: material.LastPercentage
    }, 200);
});