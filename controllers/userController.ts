import {registration,login} from'../services/userService';
import { Request, Response, NextFunction } from 'express';

 export let registerUser=async(req:Request,res:Response)=>{
    try
            {
                  const resdata=await registration(req);
                  if(resdata)
                        res.status(200).send(resdata);
              
            }
            catch(err:any)
            {
                  //Internal server error
                  //console.error(err.message);
                  res.status(500).send({message:"failed To register"+err.message});
            }
}

export let loginUser=async(req:Request,res:Response)=>{
    try
            {
                  const resdata=await login(req);
                  if(resdata)
                        res.status(200).send("You are logged In");
                   else
                       res.status(400).send("Invalid Password");
              
            }
            catch(err:any)
            {
                 
                  res.status(500).send({message:"failed To login"+err.message});
            }
}
