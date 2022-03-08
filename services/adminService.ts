import { role } from "../constants";
import {client1} from "../database/db";


export let all_Ticket_Info:Function=async(req:any)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const roleofuser=await client1.query(`SELECT role from users where user_name=$1`,[req.user1]);
            if(roleofuser.rows[0].role==role.USER)
               {return resolve(false);}
            else
            {
                const ticket_info:any=await client1.query(`SELECT ticket_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets`);
                    return resolve(ticket_info.rows);
            }
         }
        catch(err:any)
        {
            return reject(err);
        }
    })
}

