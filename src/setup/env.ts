import { setConfig } from "openblox/config";

setConfig({
    cloudKey: process.env.OPEN_CLOUD_API_KEY
});

process.env.TZ = 'UTC';