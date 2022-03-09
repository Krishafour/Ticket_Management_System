import { QueryResult } from "pg";
import { RESPONSE_STATUS} from "../constants";
import {client1} from "../database/db";
import { extendUserForRequest, ticketInfoOutput, tickets } from "../returnTypes";
const constants=require('../constants');


export let updateStatus:Function=async(req:extendUserForRequest):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {
            const roleOfUser:QueryResult=await client1.query(constants.ROLE_USING_USERNAME,[req.body.tokenUser_name]);
            if(roleOfUser.rows[0].role==constants.ROLE.USER)
            {
                return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:"User not allowed to update status"});
            }
            else
            {
                var dateTime = new Date();
                req.body.modified_at=dateTime;
                req.body.approved_by=req.body.tokenUser_name;
                const ticket_Info:QueryResult=await client1.query(constants.UPDATE_TICKET_STATUS,[req.body.ticket_status.toLowerCase(),req.body.modified_at,req.body.approved_by,req.params.ticket_id]);
                if(ticket_Info.rowCount!=0)
                {    
                    return resolve({status:RESPONSE_STATUS.SUCCESS,message:req.params.ticket_id+"  Ticket Status Updated Succssfully "});
                }
            }
        }
        catch(err:any)
        {
            return reject(err);
        }
    })
}

