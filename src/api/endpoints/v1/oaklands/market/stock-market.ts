import { createRoute } from "@hono/zod-openapi";
import { MemoryStoresApi } from "openblox/cloud";
import type { StockMarketMaterialSchema } from "#lib/schemas/StockMarketMaterial";
import type { StockMarketMemoryStore, BaseMaterial } from "#lib/types";
import oaklands from "#api/routes/oaklands";
import StockMarket, { type StockMarketSchema } from "#lib/schemas/StockMarket";

const example: StockMarketSchema = {
    trees: {
        raw_petrified_oak: {
            name: "Raw Petrified Oak",
            base_value: 1.75,
            current_value: 1.4525,
            current_difference: 0.83,
            last_difference: 0.8
        }
    },
    rocks: {
        raw_sand_slate: {
            name: "Raw Sand Slate",
            base_value: 10,
            current_value: 9.9,
            current_difference: 0.99,
            last_difference: 0.95
        }
    },
    ores: {
        forged_sand: {
            name: "Forged Sand",
            base_value: 24,
            current_value: 19.20,
            current_difference: 0.8,
            last_difference: 0.92
        }
    }
}

const route = createRoute({
    method: "get",
    path: "/stock-market",
    tags: ['Oaklands'],
    description: "Fetch the current material stock market values.",
    responses: {
        200: {
            content: {
                "application/json": { schema: StockMarket, example }
            },
            description: "OK"
        }
    }
});

function convertMaterialValues(values: { [key: string]: BaseMaterial }) {
    return Object.entries(values)
        .reduce<Record<string, StockMarketMaterialSchema>>((acc, [ key, info ]) => {
            return {
                [key]: {
                    name: key.split('_').map((v) => v.charAt(0).toUpperCase() + v.substring(1)).join(' '),
                    base_value: info.BasePrice,
                    current_value: info.Price,
                    current_difference: info.CurrentPercentage,
                    last_difference: info.LastPercentage
                },
                ...acc
            }
        }, {});
}

oaklands.openapi(route, async (res) => {
    const items = await MemoryStoresApi.sortedMapItem<StockMarketMemoryStore>({
        universeId: 3666294218,
        sortedMap: "MaterialValues",
        itemId: "MaterialStockMarket"
    });

    const { value: marketValues } = items.data;

    return res.json({
        trees: convertMaterialValues(marketValues.Values.Trees),
        rocks: convertMaterialValues(marketValues.Values.Rocks),
        ores: convertMaterialValues(marketValues.Values.Ores)
    }, 200);
});
