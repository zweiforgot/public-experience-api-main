import { z } from '@hono/zod-openapi';

const Characters = z.record(z.object({
    ID: z.string(),
    Name: z.string(),
    Description: z.nullable(z.string()),
    AccentColor: z.string(),
    Category: z.string(),
    Restriction: z.nullable(z.string()),
    PriceInfo: z.any(),
    Media: z.object({
        Headshot: z.string(),
        Fullbody: z.string(),
        Bust: z.string()
    }),
    Animations: z.record(z.string(), z.number()),
    ActionInfo: z.record(z.string(), z.record(z.number(), z.any())),
    PhysicalMappings: z.object({
        Head: z.nullable(z.string()),
        LowerTorso: z.nullable(z.string()),
        LeftHand: z.nullable(z.string()),
        RightHand: z.nullable(z.string())
    }),
    MovementInfo: z.object({
        WalkSpeed: z.number(),
        RunInfo: z.object({
            CanRun: z.boolean(),
            RunSpeed: z.number()
        }),
        CrawlInfo: z.object({
            CanCrawl: z.boolean(),
            CrawlSpeed: z.number()
        })
    })
}));

export type CharactersSchema = z.infer<typeof Characters>;

export default Characters;