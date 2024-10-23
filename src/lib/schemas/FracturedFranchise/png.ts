import { z } from '@hono/zod-openapi';

const PNG = z.instanceof(ArrayBuffer)
    .refine((buffer) => {
        const byteArray = new Uint8Array(buffer);
        // Check if the first 8 bytes match PNG signature
        return byteArray[0] === 0x89 &&
               byteArray[1] === 0x50 &&
               byteArray[2] === 0x4E &&
               byteArray[3] === 0x47 &&
               byteArray[4] === 0x0D &&
               byteArray[5] === 0x0A &&
               byteArray[6] === 0x1A &&
               byteArray[7] === 0x0A;
    }, {
        message: "Invalid PNG format.",
    })
    .describe("An image in PNG format represented as an ArrayBuffer.");

export default PNG;
