import { response } from "express";
import { QueryResult } from "pg";
import { RESPONSE_STATUS,TICKETS_TABLE_QUERIES,ROLE,TICKET_STATUS} from "../constants";
import {client1} from "../database/db";
import { ticketInfoOutput, tickets, tokenData, users } from "../returnTypes";


 /**
 * This function is used to update ticket status of user by admin
 *
 * @param {tickets} param is of tickets which include ticket_id of user
 * @param {tickets} body is of tickets which include ticket_status of user
 * @param {tokenData} token is of tokenData which includes user login information
 * @returns {Promis<ticketInfoOutput>}  this function is return promise of ticketInfoOutput which include updated status ticket_id
 */

export let updateStatus:Function=async(param:tickets,body:tickets,token:tokenData):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {
           // console.log(param.ticket_id+" "+body.ticket_status+" "+user.user_id+" "+user.user_name+" "+user.role);

            const deleteStatus:QueryResult=await client1.query(TICKETS_TABLE_QUERIES.IS_DELETED_USING_TICKET_ID,[param.ticket_id]);
            if(deleteStatus.rows[0].is_deleted)
            {
                    return resolve({status:RESPONSE_STATUS.FORBIDDEN,message:{error:"you are not allowed to update status of deleted ticket"}});
            }
            if(token.role==ROLE.USER)
            {
                return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:{error:"User not allowed to update status"}});
            }
            
         
            const ticketStatus:QueryResult=await client1.query(TICKETS_TABLE_QUERIES.TICKET_STATUS_USING_TICKET_ID,[param.ticket_id,false]);
            if(ticketStatus.rows[0].ticket_status==TICKET_STATUS.HOLD ||ticketStatus.rows[0].ticket_status==TICKET_STATUS.PROGRESS)
            {
                return resolve({status:RESPONSE_STATUS.FORBIDDEN,message:{error:"Admin can not set ticket status as hold or progress if ticket status already on hold or progress respectively "}});
            }
            else if(ticketStatus.rows[0].ticket_status==TICKET_STATUS.APPROVED||ticketStatus.rows[0].ticket_status==TICKET_STATUS.REJECTED)
            {
                return resolve({status:RESPONSE_STATUS.FORBIDDEN,message:{error:"Admin can not change status of Approved and Rejected Ticket"}});
            }
            else
            {
                var dateTime:Date = new Date();
                body.modified_at=dateTime;
                body.ticket_status_changed_by=token.user_name;
                const ticket_Info:QueryResult=await client1.query(TICKETS_TABLE_QUERIES.UPDATE_TICKET_STATUS,[body.ticket_status.toLowerCase(),body.modified_at,body.ticket_status_changed_by,param.ticket_id]);
                if(ticket_Info.rowCount!=0)
                {    
                    return resolve({status:RESPONSE_STATUS.SUCCESS,message:{ticket_id:param.ticket_id,succsses_message:"Ticket Status Updated Succssfully "}});
                }
            }
        }
        catch(err:unknown)
        {
            return reject(err);
        }
    })
}

