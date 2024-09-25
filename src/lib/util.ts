import { MemoryStoresApi } from "openblox/cloud";
import type { StockMarketMemoryStore } from "#lib/types";

export async function getMaterialStockMarket() {
    const store = await MemoryStoresApi.sortedMapItem<StockMarketMemoryStore>({
        universeId: 3666294218,
        sortedMap: "MaterialValues",
        itemId: "MaterialStockMarket"
    });

    // Retry the fetch again in 5 seconds.
    if (!store.response.success) {
        return new Promise<StockMarketMemoryStore>((res) => {
            setTimeout(async () => res(await getMaterialStockMarket()), 1000 * 5);
        });
    }

    return store.data.value;
}