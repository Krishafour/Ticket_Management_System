import { Request, Response, NextFunction } from 'express';
import {role} from '../constants'

export const validate=async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try{
          if(!req.body.user_name || !req.body.password || !req.body.role)
          {
            res.status(400).send('User Name OR Password OR Role Is Required');
            return;
          }
          else{
                
                if(Object.keys(req.body).length>3)
                {res.status(400).send('Extra field not allowed');
               return;}
               else{
                  if(!(req.body.role==role.ADMIN)&&!(req.body.role==role.USER))
                  {
                        res.status(400).send('role is not available');
                        return;  
                  }
               }
          }
      
    }
    catch(err:any)
    {
        //Internal server error
        //console.error(err.message);
        res.status(500).send({message:"failed To get request"+err.message});
    }
    next();
}