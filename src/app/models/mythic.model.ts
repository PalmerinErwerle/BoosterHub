export interface Mythic {
    id: string,

    //M+ specific data
    run_level: string,
    run_number: number,

    //Boosting team
    tank_id: string,
    healer_id: string,
    dps1_id: string,
    dps2_id: string,

    //Adviser data
    adviser_id: string,

    //Boost in-game data
    status: string,
    description: string,
    feedback: string,
    logs_link: string,

    //Boost economic data
    price: number
}