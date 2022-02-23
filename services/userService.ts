
import { Request, Response, NextFunction } from 'express';
import {client1} from "../database/db";
import bcryptjs from 'bcryptjs';

 export const registration=async(req : Request)=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   //check if data already exist
             const user=await client1.query(`SELECT user_name from users where user_name=$1`,[req.body.user_name]);
             if(user)
             return resolve("User already exist");
             //default is user
            req.body.role="user";
            //add data if not exist already
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            
            const response=await client1.query(`INSERT INTO "users" ("user_name","password", "role")  
            VALUES ($1, $2,$3)`,[req.body.user_name,hashedPassword,req.body.role]);
            if(response)
                return resolve("User Registered SUccessfully");
        }
        catch(error:any)
        {
            
            return reject(error);
        }
    })
}
export const login=async(req : Request)=>{
    return new Promise(async(resolve,reject)=>{
        try
        {   //check if data already exist
             const user=await client1.query(`SELECT password from users where user_name=$1`,[req.body.user_name]);
             
             if(user)
               console.log("User Is not found");
               console.log(user);
            //user.toString(user);
            
            if(await bcryptjs.compare(req.body.password, user.rows[1].password)){
                return resolve(true);
            }
            else{
                return resolve(false);
            }
           
        }
        catch(error:any)
        {
            
            return reject(error);
        }
    })
}
