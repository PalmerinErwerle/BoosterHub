export interface Raid {
    id: string,

    //Boosting team
    tank1_id: string,
    tank2_id: string,
    healer1_id: string,
    healer2_id: string,
    dps1_id: string,
    dps2_id: string,
    dps3_id: string,
    dps4_id: string,
    dps5_id: string,
    dps6_id: string,

    //Adviser data
    adviser_id: string,

    //Boost in-game data
    status: string,
    description: string,
    feedback: string,
    logs_link: string,

    //Boost economic data
    price: number,
    booster_cut: number,
    adviser_cut: number
}