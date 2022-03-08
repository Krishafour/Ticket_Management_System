import {registration,login,raise_A_Ticket} from'../services/userService';
import { Request, Response, NextFunction } from 'express';
const jwt=require('jsonwebtoken');
require("dotenv").config();
import {RESPONSE_STATUS} from '../constants'


 export let registerUser:Function=async(req:Request,res:Response):Promise<void>=>{
    try
      {
            
            const resdata:any=await registration(req);
            if(resdata)
                  res.status(RESPONSE_STATUS.CONFLICT).send({message:"user already exist"});
            else
             res.status(RESPONSE_STATUS.SUCCESS).send({message:"user_id :"+resdata+"user_name"+req.body.user_name+"\n user registered successfully"})
              
      }
      catch(err:any)
      {
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To register"+err.message});
      }
}


export let loginUser:Function=async(req:Request,res:Response):Promise<void>=>{
    try
      {
            const resdata:any=await login(req);
            if(resdata)
            {     
                  var token:string = jwt.sign({ user: req.body.user_name},process.env.SECRET_KEY,{expiresIn:"60 seconds"});       
                  res.status(RESPONSE_STATUS.SUCCESS).send({token});
            }      
            else
                  res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"Invalid Password"});
              
      }
      catch(err:any)
      {          
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To login "+err.message});
      }
}


export let raise_Ticket:Function=async(req:Request,res:Response):Promise<void>=>{
      try
      {
            const resdata:any=await raise_A_Ticket(req);
            if(resdata)
            {     
                  res.status(RESPONSE_STATUS.SUCCESS).send({meassage:"ticket_id :"+resdata+"    Ticket Raise Successfully"});
            }      
            
      }
      catch(err:any)
      {
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Raise A Ticket"+err.message});
      }
  }
