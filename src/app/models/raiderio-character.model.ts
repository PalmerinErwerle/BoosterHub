export interface RaiderIoCharacter {
    name: string;
    race: string;
    class: string;
    active_spec_name: string;
    active_spec_role: string;
    faction: string;
    gender: string;
    achievement_points: number;
    gear: {
        item_level_equipped: number;
    }
    mythic_plus_scores_by_season: Array<{
        scores: {
            all: number;
        };
    }>;
}