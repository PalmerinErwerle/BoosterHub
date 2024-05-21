export interface Strike {
    id: string,

    //Related users data
    striked_id: string,
    admin_id: string,
    
    //Strike data
    status: string,
    description: string,
    penalty: number
}