export type BaseMaterial = {
    name: string;
    base_value: number;
    current_value: number;
    current_difference: number;
    last_difference: number;
};

export interface MaterialStockMarket {
    Trees: Record<string, BaseMaterial>;
    Rocks: Record<string, BaseMaterial>;
    Ores: Record<string, BaseMaterial>;
};