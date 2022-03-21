import {client1} from "../database/db";
import bcryptjs from 'bcryptjs';
import { stringify, v4 as uuidv4 } from "uuid";
import {  userOutputs, ticketInfoOutput,  tokenData, tickets,user } from '../returnTypes';
import { RESPONSE_STATUS, ROLE,USER_TABLE_QUERIES,TICKETS_TABLE_QUERIES, TICKET_STATUS} from '../constants';
import { QueryResult } from 'pg';
import { databaseOperation } from "../database/queryfunctions";
const jwt=require('jsonwebtoken');


 /**
 * This function is used to update ticket of user by user
 *
 * @param {user} body is of user which include user_name,password,role of user
 * @returns {Promis<userOutputs>}  this function is return promise of userOutputs which include user_id of successfully registered user
 */
 export const registration=async(body:user):Promise<userOutputs>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   //check if data already exist
            //fucntion add
            const user:QueryResult=await databaseOperation(USER_TABLE_QUERIES.USERNAME_USING_USERNAME,[body.user_name]);
            if(user.rowCount!=0)
            {
                return resolve({status:RESPONSE_STATUS.BAD_REQUEST,message:{error:"user already exist"}});
            }
            //creating unique id
            const uniqueId:string = uuidv4();
            body.user_id=uniqueId;
            //add data if not exist already
            const hashedPassword:string = await bcryptjs.hash(body.password, 10);
            const response:QueryResult=await databaseOperation(USER_TABLE_QUERIES.INSERT_USER,[body.user_id,body.user_name,hashedPassword,body.role.toLowerCase()]);
            if(response)
                return resolve({status:RESPONSE_STATUS.SUCCESS,message:{user_id:body.user_id,user_name:body.user_name,succsses_message:body.role.toLowerCase()+" registered successfully"}});
        }
        catch(error:any|unknown)
        {
            
            return reject(error);
        }
    })
}


 /**
 * This function is main function used to login by useror admin.
 * 
 * @param {user} body is of user which include user_name and password of user
 * @returns {Promis<userOutputs>}  this function is return promise of userOutputs which include jwt token of user logged in successfully 
 */
export const login=async(body: user):Promise<userOutputs>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
            //check username is present or NOT
            const user:QueryResult=await databaseOperation(USER_TABLE_QUERIES.USERNAME_USING_USERNAME,[body.user_name]);
            if(user.rowCount==0)
            {
                return resolve({status:RESPONSE_STATUS.BAD_REQUEST,message:{error:"User name invalid"}});
            }
            //get password using user_name
            const passwordlog:QueryResult=await databaseOperation(USER_TABLE_QUERIES.PASSWORD_USER_ID_ROLE_USING_USERNAME,[body.user_name]);

            if(await bcryptjs.compare(body.password, passwordlog.rows[0].password))
            {   
                var token:string = jwt.sign({user_id:passwordlog.rows[0].user_id, user_name: body.user_name,role:passwordlog.rows[0].role},process.env.SECRET_KEY,{expiresIn:"1800 seconds"});      
                    return resolve({status:RESPONSE_STATUS.SUCCESS,message:{token:token}});
            }
            else
            {
                return resolve({status:RESPONSE_STATUS.BAD_REQUEST,message:{error:"Invalid password"}});
            }
        }
        catch(error:unknown)
        {
            
            return reject(error);
        }
    })
}



 /**
 * This function is main function used to raise a ticket  by user
 *
 * @param {tickets} body is of tickets which include ticket_description of user
 * @param {tokenData} token is of tokenData which includes user login information
 * @returns {Promis<ticketInfoOutput>}  this function is return promise of ticketInfoOutput which include raised ticket ticket_id
 */
export const raise_A_Ticket=async(body:tickets,token:tokenData):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
            //create unique id
            const uniqueId:string = uuidv4();
            var dateTime:Date = new Date();
            body.ticket_id=uniqueId;
            //default status progress
            body.ticket_status="new";
            if(token.role==ROLE.ADMIN)
            {
                return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:{error:"Admin cannot raise a ticket"}});
            }
            //set created_by as user_name of user
            body.created_by=token.user_name;
            //set foreign key user_id 
            body.user_id=token.user_id;
            //set date and time 
            body.modified_at=dateTime;
            body.created_at=dateTime;
            //set ticket_status_changed_by default
            body.ticket_status_changed_by="null";
            const response:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.INSERT_TICKET,[body.ticket_id,body.user_id,body.ticket_description.toLocaleLowerCase(),body.ticket_status,body.created_at,body.modified_at,body.created_by,body.ticket_status_changed_by]);
            if(response)
                return resolve({status:RESPONSE_STATUS.SUCCESS,message:{ticket_id:body.ticket_id ,succsses_message:"Ticket raised succssfully"}});
        }
        catch(error:any|unknown)
        {
            return reject(error);
        }
    })
}



 /**
 * This function is main function used to get all ticket of user by user or admin
 *
 * @param {tokenData} token is of tokenData which includes user login information
 * @returns {Promis<ticketInfoOutput>}  this function is return promise of ticketInfoOutput which include ticket informaton
 */
export let all_Ticket_Info:Function=async(token:tokenData):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try{
            
            
            if(token.role==ROLE.USER)
            {
                const ticketInfo:QueryResult= await databaseOperation(TICKETS_TABLE_QUERIES.TICKET_INFORMATION_OF_USER,[token.user_id,false]);
                return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
            }
            else
            {
                const ticketInfo:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.TICKET_INFORMATION,[false]);
                return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
            }
         }
        catch(err:any|unknown)
        {
            return reject(err);
        }
    })
}



 /**
 * This function is main function used to delete ticket of user by user or admin
 *
 * @param {tickets} param is of tickets which include ticket_id of user
 * @param {tokenData} token is of tokenData which includes user login information
 * @returns {Promis<ticketInfoOutput>}  this function is return promise of ticketInfoOutput which include deleted ticket ticket_id
 */
export const deleteTicket:Function=async(param:tickets,token:tokenData):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
           
            const userId:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.USER_ID_USING_TICKET_ID,[param.ticket_id]);
            if(userId.rows[0].user_id!=token.user_id && token.role==ROLE.USER)
            {

                return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:{error:"User is not allow to delete this ticket"}});
            }
            const deleteStatus:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.IS_DELETED_USING_TICKET_ID,[param.ticket_id])
            if(deleteStatus.rows[0].is_deleted)
            {
                return resolve({status:RESPONSE_STATUS.FORBIDDEN,message:{error:"User is not allowed delete deleted ticket"}});
            }
            
            const dateTime:Date=new Date();
            const del:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.DELETE_TICKET_USING_TICKETID,[true,dateTime,"withdraw",param.ticket_id]);
            if(del.rowCount!=0)
            {
                return resolve({status:RESPONSE_STATUS.SUCCESS,message:{ticket_id:param.ticket_id,succsses_message:"Your ticket deleted successfully"}});
            }
        }
        catch(error:any|unknown)
        {
            
            return reject(error);
        }
    })
}

 /**
 * This function is main function used to get ticket history of user by user or admin
 *
 * @param {tokenData} token is of tokenData which includes user login information
 * @returns {Promis<ticketInfoOutput>}  this function is return promise of ticketInfoOutput which include all ticket infromation
 */
export let allTicketHistory:Function=async(token:tokenData):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try{
            
            if(token.role==ROLE.USER)
            {
                const ticketInfo:QueryResult= await databaseOperation(TICKETS_TABLE_QUERIES.TICKET_INFORMATION_HISTORY_OF_USER,[token.user_id,false,TICKET_STATUS.APPROVED,TICKET_STATUS.REJECTED]);
                return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
            }
            else
            {
                const ticketInfo:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.TICKET_INFORMATION_HISTORY,[TICKET_STATUS.APPROVED,TICKET_STATUS.REJECTED,false]);
                return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
            }
         }
        catch(err:any|unknown)
        {
            return reject(err);
        }
    })
}



 /**
 * This function is main function used to update ticket of user by user
 *
 * @param {tickets} param is of tickets which include ticket_id of user
 * @param {tickets} body is of tickets which include ticket_description of user
 * @param {tokenData} token is of tokenData which includes user login information
 * @returns {Promis<ticketInfoOutput>}  this function is return promise of ticketInfoOutput which include updated ticket_description ticket_id
 */

export let updateTicket:Function=async(param:tickets,body:tickets,token:tokenData):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {
            const userId:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.USER_ID_USING_TICKET_ID,[param.ticket_id]);
            if(userId.rows[0].user_id!=token.user_id)
            {

                return resolve({status:RESPONSE_STATUS.FORBIDDEN,message:{error:"User is not allow to update ticket of other user"}});
            }
            const deleteStatus:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.IS_DELETED_USING_TICKET_ID,[param.ticket_id]);
            if(deleteStatus.rows[0].is_deleted)
            {
                return resolve({status:RESPONSE_STATUS.FORBIDDEN,message:{error:"You are not allowed to update ticket of deleted ticket"}});
            }
            const ticketStatus:QueryResult= await databaseOperation(TICKETS_TABLE_QUERIES.TICKET_STATUS_USING_TICKET_ID,[param.ticket_id,false]);
            if(ticketStatus.rows[0].ticket_status==TICKET_STATUS.APPROVED || ticketStatus.rows[0].ticket_status==TICKET_STATUS.REJECTED)
            {
                return resolve({status:RESPONSE_STATUS.FORBIDDEN,message:{error:"User can not update ticket description of approved and rejected ticket"}});
            }
            else
            {
                var dateTime:Date = new Date();
                body.modified_at=dateTime;
                const ticket_Info:QueryResult=await databaseOperation(TICKETS_TABLE_QUERIES.UPDATE_TICKET_DESCRIPTION,[body.ticket_description,body.modified_at,param.ticket_id]);
                if(ticket_Info.rowCount!=0)
                {    
                    return resolve({status:RESPONSE_STATUS.SUCCESS,message:{ticket_id:param.ticket_id,succsses_message:"Ticket description updated succssfully"}});
                }
            }
        }
        catch(err:any|unknown)
        {
            return reject(err);
        }
    })
}

