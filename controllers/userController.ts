import {registration,login,raise_a_ticket} from'../services/userService';
import { Request, Response, NextFunction } from 'express';
const jwt=require('jsonwebtoken');
require("dotenv").config();
import {RESPONSE} from '../constants'


 export let registerUser:Function=async(req:Request,res:Response):Promise<void>=>{
    try
      {
            
            const resdata:any=await registration(req);
            if(resdata==RESPONSE)
                  res.status(409).send(RESPONSE);
            else
             res.status(200).send("user_id :"+resdata+"\n user registered successfully")
              
      }
      catch(err:any)
      {
            res.status(500).send({message:"failed To register"+err.message});
      }
}


export let loginUser:Function=async(req:Request,res:Response):Promise<void>=>{
    try
      {
            const resdata:any=await login(req);
            if(resdata)
            {     
                  var token:string = jwt.sign({ user: req.body.user_name},process.env.SECRET_KEY,{expiresIn:"60 seconds"});       
                  res.status(200).send({token});
            }      
            else
                  res.status(400).send("Invalid Password");
              
      }
      catch(err:any)
      {          
            res.status(500).send({message:"failed To login"+err.message});
      }
}


export let raise_ticket:Function=async(req:Request,res:Response):Promise<void>=>{
      try
      {
            const resdata:any=await raise_a_ticket(req);
            if(resdata)
            {     
                  res.status(200).send("Ticket Raise Successfully");
            }      
            else
            res.status(400).send("Ticket Not Raised");
            
      }
      catch(err:any)
      {
            res.status(500).send({message:"failed To Raise A Ticket"+err.message});
      }
  }
