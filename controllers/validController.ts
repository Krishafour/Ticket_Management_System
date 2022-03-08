import { Request, Response, NextFunction } from 'express';
import {RESPONSE_STATUS} from '../constants';

export const validate=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
          if(!req.body.user_name || !req.body.password || !req.body.role)
          {
            res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"User Name OR Password OR Role Is Required"});
            return;
          }
          else{
                 if(Object.keys(req.body).length!=3)
                 {
                        res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"Required fields not available"});
                        return;
                 }
              
          }
      
    }
    catch(err:any)
    {
        //Internal server error
        //console.error(err.message);
        res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To get request"+err.message});
    }
    next();
}