export interface Leveling {
    id: string,

    //Leveling specific data
    level_range: string,

    //Related users data
    booster_id: string,
    adviser_id: string,

    //Boost in-game data
    status: string,
    description: string,
    feedback: string,

    //Boost economic data
    price: number
}