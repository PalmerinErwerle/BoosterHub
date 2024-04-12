export interface Leveling {
    id: string,

    //Leveling specific data
    start_level: number,
    end_level: number,

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