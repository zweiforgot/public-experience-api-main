export type PurchaseType = "Badge" | "Gamepass" | "Tokens"

export type PriceInformation = {
	PurchaseType: PurchaseType,
	Cost?: number,
	BadgeId?: number,
	GamepassId?: number
}

type ActionInstancePropertiesList = Record<string, Record<string, any>>

export type ToggleAction = {
	DisplayName: string,
	Description?: string,
	DefaultBind: string,
	Type: "Toggle",
	DefaultState: boolean,
	States?: any,
	Animation?: number
}

export type OneClickAction = {
	DisplayName: string,
	Description?: string,
	DefaultBind: string,
	Type: "OneClick",
	Cooldown?: number,
	PropertyList: ActionInstancePropertiesList
}

export type CharacterAction = ToggleAction | OneClickAction

export type Character = {
    ID: string,
    Name: string,
    Description?: string,
    AccentColor?: string,
    Category: string,
    Restriction?: string,
    PriceInfo: PriceInformation,
    Media: {
        Headshot: string,
        Fullbody: string,
        Bust: string
    },
    Animations: Record<string, number>,
    ActionInfo: Record<string, Record<number, CharacterAction>>,
    PhysicalMappings?: {
        Head?: string,
        LowerTorso?: string,
        LeftHand?: string,
        RightHand?: string
    },
    MovementInfo: {
        WalkSpeed: number,
        RunInfo: {
            CanRun: boolean,
            RunSpeed: number
        },
        CrawlInfo: {
            CanCrawl: boolean,
            CrawlSpeed: number
        }
    }
};

export type CharacterData = Record<string, Character>
export type IndividualCharacter = Character