import { Request, Response, NextFunction } from 'express';
import {client1} from "../database/db";
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
const jwt=require('jsonwebtoken');


 export const registration=async(req : Request):Promise<any>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   //check if data already exist
            //fucntion add
            const user=await client1.query(`SELECT user_name from users where user_name=$1`,[req.body.user_name]);
            if(user.rowCount!=0)
            {
                return resolve(false);
            }
             
            //creating unique id
            const uniqueId = uuidv4();
            req.body.id=uniqueId;
            //add data if not exist already
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            const response=await client1.query(`INSERT INTO "users" ("id","user_name","password", "role")  
            VALUES ($1, $2,$3,$4)`,[req.body.id,req.body.user_name,hashedPassword,req.body.role]);
            if(response)
                return resolve(uniqueId);
        }
        catch(error:any)
        {
            
            return reject(error);
        }
    })
}
export const login=async(req : Request):Promise<string|boolean>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
            
            //get password using user_name
             const passwordlog=await client1.query(`SELECT password from users where user_name=$1`,[req.body.user_name]);
             const passwordcode=passwordlog.rows;

            if(await bcryptjs.compare(req.body.password, passwordcode[0].password))
            {    
                return resolve(true);
            }
            else
            {
                return resolve(false);
            }
           
        }
        catch(error:any)
        {
            
            return reject(error);
        }
    })
}
export const raise_A_Ticket=async(req : any):Promise<string|boolean>=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   
            
            const uniqueId = uuidv4();
            var dateTime = new Date();
            req.body.ticket_id=uniqueId;
            req.body.ticket_status="progress"
            const userid=await client1.query(`SELECT id from users where user_name=$1`,[req.user1])
            req.body.user_id=userid.rows[0].id;
            req.body.created_by=req.user1;
            req.body.modified_at=dateTime;
            req.body.created_at=dateTime;
            req.body.approved_by="not_approved_yet";
            const response=await client1.query(`INSERT INTO "tickets" ("ticket_id","user_id","ticket_description","ticket_status", "created_at","modified_at","created_by","approved_by")  
            VALUES ($1, $2,$3,$4,$5,$6,$7,$8)`,[req.body.ticket_id,req.body.user_id,req.body.ticket_description,req.body.ticket_status,req.body.created_at,req.body.modified_at,req.body.created_by,req.body.approved_by]);
            if(response)
                return resolve(uniqueId);
        }
        catch(error:any)
        {
            return reject(error);
        }
    })
}


