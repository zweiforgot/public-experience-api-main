import path from 'path';
import { readdirSync } from 'fs';

function getFilePaths(dir: string, filterPath: string = '.ts', paths: string[] = []): string[] {
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

export const routes = getFilePaths(path.join(process.cwd(), 'src/api/endpoints'));

for (const router of routes) {
    try {
        await import(router);
    }
    catch (e) {
        console.log(e);
    }
}