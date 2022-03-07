import {client1} from "../database/db";


export let all_ticket_info:Function=async()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const ticket_info:any=await client1.query(`SELECT ticket_id,ticket_description,ticket_status,raising_time,status_time,created_by,approved_by from tickets`);
            
            return resolve(ticket_info.rows);
         }
        catch(err:any)
        {
            return reject(err);
        }
    })
}

