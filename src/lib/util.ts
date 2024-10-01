import path from 'path';
import { readdirSync, readFileSync } from 'fs';
import { LuauExecutionApi } from "openblox/cloud";
import { pollMethod } from 'openblox/helpers';
import type { MaterialStockMarket } from '@/lib/types/experience';
import { OaklandsPlaceIDs, UniverseIDs } from '@/lib/types/enums';

/**
 * Read the contents of a Lua/Luau file.
 * @param fileName The file to read.
 * @returns {string | null}
 */
function _readLuaFile(fileName: string): string | null {
    if (!fileName.endsWith('.lua') && !fileName.endsWith('.luau')) {
        return null;
    }

    const filePath = path.join(process.cwd(), '/src/lib/luau-execution', fileName);
    const code = readFileSync(filePath, { encoding: 'utf-8' });

    return code;
}

async function _executeLuau<Data extends Object>(script: string, info: { universeId: number, placeId: number }) {
    const { data: { universeId, placeId, version, sessionId, taskId } } = await LuauExecutionApi.executeLuau({
        ...info, script
    });
    
    const { data: executedTask } = await pollMethod(
        LuauExecutionApi.luauExecutionTask<Data[]>({ universeId, placeId, version, sessionId, taskId }),
        async ({ data }, stopPolling) => data.state === "COMPLETE" && stopPolling(),
    );

    if (typeof executedTask.output !== 'object') {
        throw new Error('Unexpected return type');
    }

    if (executedTask.output === null) {
        throw new Error('Unexpected return type');
    }

    return executedTask.output.results;
}

/**
 * Get all paths for a certain extension in a directory.
 * @param dir The directory that you want to get files for.
 * @param filterPath The files that you want to get based on extenion
 * @param paths A list of current paths.
 * @returns {string[]}
 */
export function getFilePaths(dir: string, filterPath: string = '.ts', paths: string[] = []): string[] {
    const files = readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dir, file.name);

        if (file.isDirectory()) {
            getFilePaths(filePath, filterPath, paths);
            continue;
        }

        paths.push(filePath);
    }

    return paths.filter((p) => p.endsWith(filterPath));
}

/**
 * Get the current Oaklands material stock market.
 * @returns 
 */
export async function getMaterialStockMarket() {
    const script = _readLuaFile('stock-market.luau');
    if (!script) return;

    const result = await _executeLuau<MaterialStockMarket>(script, { universeId: UniverseIDs.Oaklands, placeId: OaklandsPlaceIDs.Staging });
    if (!result) return;

    return result[0];
}

/**
 * Get the current items in the classic shop.
 * @returns 
 */
export async function getCurrentClassicShop() {
    const script = _readLuaFile('classic-shop.luau');
    if (!script) return;

    const result = await _executeLuau<string[]>(script, { universeId: UniverseIDs.Oaklands, placeId: OaklandsPlaceIDs.Staging });
    if (!result) return;

    return result[0];
}