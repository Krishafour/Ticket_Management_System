import { Request, Response, NextFunction } from 'express';
import {client1} from "../database/db";
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { extendUserForRequest, userOutputs,extendTicketForRequest, ticketInfoOutput } from '../returnTypes';
import { RESPONSE_STATUS, ROLE} from '../constants';
import { QueryResult } from 'pg';
const jwt=require('jsonwebtoken');
const constants=require('../constants');

 export const registration=async(req : extendUserForRequest):Promise<userOutputs>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   //check if data already exist
            //fucntion add
            const user:QueryResult=await client1.query(constants.USERNAME_USING_USERNAME,[req.body.user_name]);
            if(user.rowCount!=0)
            {
                return resolve({status:RESPONSE_STATUS.CONFLICT,message:"user already exist"});
            }
            //creating unique id
            const uniqueId:string = uuidv4();
            req.body.id=uniqueId;
            //add data if not exist already
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            const response:QueryResult=await client1.query(constants.INSERT_USER,[req.body.id,req.body.user_name,hashedPassword,req.body.role.toLowerCase()]);
            if(response)
                return resolve({status:RESPONSE_STATUS.SUCCESS,user:req.body.id});
        }
        catch(error:any)
        {
            
            return reject(error);
        }
    })
}
export const login=async(req : extendUserForRequest):Promise<userOutputs>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
            //check username is present or NOT
            const user:QueryResult=await client1.query(constants.USERNAME_USING_USERNAME,[req.body.user_name]);
            if(user.rowCount==0)
            {
                return resolve({status:RESPONSE_STATUS.BAD_REQUEST,message:"user name Invalid"});
            }
            //get password using user_name
            const passwordlog:QueryResult=await client1.query(constants.PASSWORD_USING_USERNAME,[req.body.user_name]);
            const passwordcode=passwordlog.rows;

            if(await bcryptjs.compare(req.body.password, passwordcode[0].password))
            {   
                var token:string = jwt.sign({ user: req.body.user_name},process.env.SECRET_KEY,{expiresIn:"1800 seconds"});      
                    return resolve({status:RESPONSE_STATUS.SUCCESS,message:token});
            }
            else
            {
                return resolve({status:RESPONSE_STATUS.BAD_REQUEST,message:"invalid Password"});
            }
        }
        catch(error:any)
        {
            
            return reject(error);
        }
    })
}
export const raise_A_Ticket=async(req : extendTicketForRequest):Promise<userOutputs>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
            //create unique id
            const uniqueId:string = uuidv4();
            var dateTime = new Date();
            req.body.ticket_id=uniqueId;
            //default status progress
            req.body.ticket_status="progress";
            const userId:QueryResult=await client1.query(constants.ID_USING_USERNAME,[req.body.tokenUser_name]);
            //check role of user
            const userRole:QueryResult=await client1.query(constants.ROLE_USING_USERNAME,[req.body.tokenUser_name]);
            if(userRole.rows[0].role==ROLE.ADMIN)
            {
                return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:"Admin cannot raise a ticket"});
            }
            //set created_by as user_name of user
            req.body.created_by=req.body.tokenUser_name;
            //set foreign key user_id 
            req.body.user_id=userId.rows[0].id;
            //set date and time 
            req.body.modified_at=dateTime;
            req.body.created_at=dateTime;
            //set approved_by default
            req.body.approved_by="not_approved_yet";
            const response:QueryResult=await client1.query(constants.INSER_TICKET,[req.body.ticket_id,req.body.user_id,req.body.ticket_description,req.body.ticket_status,req.body.created_at,req.body.modified_at,req.body.created_by,req.body.approved_by]);
            if(response)
                return resolve({status:RESPONSE_STATUS.SUCCESS,message:req.body.ticket_id +"   Ticket Raised Succssfully"});
        }
        catch(error:any)
        {
            return reject(error);
        }
    })
}
export let all_Ticket_Info:Function=async(req:extendUserForRequest):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try{
            
            const roleOfUser:QueryResult=await client1.query(constants.ROLE_USING_USERNAME,[req.body.tokenUser_name]);
            const userNameOfUser:QueryResult=await client1.query(constants.USERNAME_USING_ID,[req.params.id]);

             if(userNameOfUser.rows[0].user_name!=req.body.tokenUser_name)
             {
                 return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:"Unauthorized"});
             }
            if(roleOfUser.rows[0].role==constants.ROLE.USER)
               {
                   const ticketInfo:any= await client1.query(constants.TICKET_INFORMATION_OF_USER,[req.params.id]);
                   return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
                }
            else
            {
                const ticketInfo:any=await client1.query(constants.TICKET_INFORMATION);
                    return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
            }
         }
        catch(err:any)
        {
            return reject(err);
        }
    })
}
export const deleteTicket:Function=async(req : extendUserForRequest):Promise<userOutputs>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
            const userId:QueryResult=await client1.query(constants.USERID_USING_TICKETID,[req.params.ticket_id]);
            const userName:QueryResult=await client1.query(constants.USERNAME_USING_ID,[userId.rows[0].user_id])
            if(userName.rows[0].user_name!=req.body.tokenUser_name)
            {
                return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:"Not able to withdraw ticket"});
            }
            const status:QueryResult=await client1.query(constants.STATUS_USING_TICKETID,[req.params.ticket_id]);
            if(status.rows[0].ticket_status==constants.TICKET_STATUS.APPROVE||status.rows[0].ticket_status==constants.TICKET_STATUS.REJECT)
            {
                return resolve({status:RESPONSE_STATUS.BAD_REQUEST,message:"You are not allow to delete approve and reject ticket "});
            }
            const del:QueryResult=await client1.query(constants.DELETE_TICKET_USING_TICKETID,[req.params.ticket_id]);
            if(del.rowCount!=0)
            {
                return resolve({status:RESPONSE_STATUS.SUCCESS,message:"Your ticket deleted successfully"});
            }
        }
        catch(error:any)
        {
            
            return reject(error);
        }
    })
}
export let allTicketHistory:Function=async(req:extendUserForRequest):Promise<ticketInfoOutput>=>{
    return new Promise(async(resolve,reject)=>{
        try{
            
            const roleOfUser:QueryResult=await client1.query(constants.ROLE_USING_USERNAME,[req.body.tokenUser_name]);
            const userNameOfUser:QueryResult=await client1.query(constants.USERNAME_USING_ID,[req.params.id]);

             if(userNameOfUser.rows[0].user_name!=req.body.tokenUser_name)
             {
                 return resolve({status:RESPONSE_STATUS.UNAUTHORIZED,message:"Unauthorized"});
             }
            if(roleOfUser.rows[0].role==constants.ROLE.USER)
               {
                   const ticketInfo:any= await client1.query(constants.TICKET_INFORMATION_HISTORY_OF_USER,[req.params.id,constants.TICKET_STATUS.APPROVE,constants.TICKET_STATUS.REJECT]);
                   return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
                }
            else
            {
                const ticketInfo:any=await client1.query(constants.TICKET_INFORMATION_HISTORY,[constants.TICKET_STATUS.APPROVE,constants.TICKET_STATUS.REJECT]);
                    return resolve({status:RESPONSE_STATUS.SUCCESS,ticket:ticketInfo.rows});
            }
         }
        catch(err:any)
        {
            return reject(err);
        }
    })
}

