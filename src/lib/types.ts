export type BaseMaterial = {
    CurrentPercentage: number,
    Price: number,
    BasePrice: number,
    LastPercentage: number
};

export interface StockMarketMemoryStore {
    PlaceVersion: number,
    LastUpdated: number,
    Values: {
        Trees: { [key: string]: BaseMaterial },
        Rocks: { [key: string]: BaseMaterial },
        Ores: { [key: string]: BaseMaterial }
    }
}