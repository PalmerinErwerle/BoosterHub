export interface User {
    uid: string,

    //User login
    email: string,
    password: string,

    //User role & status
    role: string,

    //Character general data
    character_name: string,
    character_realm: string,

    //Character lore data
    character_faction: string,
    character_race: string,

    //Character competitive data
    character_role: string,
    character_class: string,
    character_ilevel: number,
    character_rio: string,

    //Message to show if user is banned
    ban_message: string
}