import { z } from '@hono/zod-openapi';

const Character = z.object({
    ID: z.string(),
    Name: z.string(),
    Description: z.string().optional(),
    AccentColor: z.string().optional(),
    Category: z.string(),
    Restriction: z.string().optional(),
    PriceInfo: z.any(),
    Media: z.object({
        Headshot: z.string(),
        Fullbody: z.string(),
        Bust: z.string()
    }),
    Animations: z.record(z.number()),
    ActionInfo: z.record(z.record(z.any())),
    PhysicalMappings: z.object({
        Head: z.string().optional(),
        LowerTorso: z.string().optional(),
        LeftHand: z.string().optional(),
        RightHand: z.string().optional()
    }).optional(),
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
});

const Characters = z.object({
    characters: z.record(Character)
});

export type CharacterSchema = z.infer<typeof Characters>;
export type CharactersSchema = z.infer<typeof Characters>;

export default Characters;