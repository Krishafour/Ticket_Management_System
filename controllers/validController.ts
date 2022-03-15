import { Request, Response, NextFunction } from 'express';
import {RESPONSE_STATUS, ROLE} from '../constants';
import { extendAllForRequest } from '../returnTypes';
import { TICKET_STATUS } from '../constants';

 /**
 * This function is used to validate register user body
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @param {NextFunction} next  is of  NextFunction
 * @returns {Promis<void>}  this function is return promise of  void
 */
export const validateRegisterUser:Function=async(req:extendAllForRequest,res:Response,next:NextFunction):Promise<void>=>{
    try{
          if(!req.body.user_name || !req.body.password || !req.body.role)
          {
            res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"user_name or password or role is required"});
            return;
          }
          if((req.body.role.toLowerCase()!=ROLE.ADMIN) && (req.body.role.toLowerCase()!=ROLE.USER))
          {
              res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"This role is not available"});
              return;  
           }
          const regex:RegExp=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if(!regex.test(req.body.user_name))
          {
              res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"email is not valid"});
              return;
          }
          if(!req.body.user_name.trim())
          {
              res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"user_name or password or role should not be empty"});
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
    catch(err:any|unknown)
    {
        res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To get request"+err.message});
    }
    next();
}
 /**
 * This function is used to validate register user body
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @param {NextFunction} next  is of  NextFunction
 * @returns {Promis<void>}  this function is return promise of  void
 */
export const validateLoginUser:Function=async(req:extendAllForRequest,res:Response,next:NextFunction):Promise<void>=>{
       try{
             if(!req.body.user_name || !req.body.password )
             {
               res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"user_name or password is required"});
               return;
             }
             if(!req.body.user_name.trim()||req.body.password.trim())
             {
                 res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"user_name or password should not be empty"});
                 return;
             }
             else{
                    if(Object.keys(req.body).length!=2)
                    {
                           res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"Required fields not available"});
                           return;
                    }
                 
             }
             
             
       }
       catch(err:any|unknown)
       {
           res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To get request"+err.message});
       }
       next();
   }
   
/**
 * This function is used to validate register user body
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @param {NextFunction} next  is of  NextFunction
 * @returns {Promis<void>}  this function is return promise of  void
 */
   export const validateRaise_Ticket:Function=async(req:extendAllForRequest,res:Response,next:NextFunction):Promise<void>=>{
       try{
             if(!req.body.ticket_description)
             {
               res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"ticket_description is required"});
               return;
             }
             if(!req.body.ticket_description.trim())
             {
                 res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"ticket_description should not be empty"});
                 return;
             }
             else{
                    if(Object.keys(req.body).length!=1)
                    {
                           res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"Required fields not available"});
                           return;
                    }
                 
             }
             
             
       }
       catch(err:any|unknown)
       {
           res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To get request"+err.message});
       }
       next();
   }

 /**
 * This function is used to validate register user body
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @param {NextFunction} next  is of  NextFunction
 * @returns {Promis<void>}  this function is return promise of  void
 */
   export const validateUpdate_Ticket:Function=async(req:extendAllForRequest,res:Response,next:NextFunction):Promise<void>=>{
       try{
             if(!req.body.ticket_description)
             {
               res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"ticket_description is required"});
               return;
             }
             if(!req.body.ticket_description.trim())
             {
                 res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"ticket_description should not be empty"});
                 return;
             }
             else{
                    if(Object.keys(req.body).length!=1)
                    {
                           res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"Required fields not available"});
                           return;
                    }
                 
             }
             
             
       }
       catch(err:any|unknown)
       {
           res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To get request"+err.message});
       }
       next();
   }
    
/**
 * This function is used to validate register user body
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @param {NextFunction} next  is of  NextFunction
 * @returns {Promis<void>}  this function is return promise of  void
 */
export const validateUpdate_Status:Function=async(req:extendAllForRequest,res:Response,next:NextFunction):Promise<void>=>{
  try{
        
        if(!req.body.ticket_status)
        {
          res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"ticket_status is required"});
          return;
        }
        if((req.body.ticket_status.toLowerCase()!=TICKET_STATUS.PROGRESS) && (req.body.ticket_status.toLowerCase()!=TICKET_STATUS.HOLD) && (req.body.ticket_status.toLowerCase()!=TICKET_STATUS.APPROVED) &&(req.body.ticket_status.toLowerCase()!=TICKET_STATUS.REJECTED))
        {
              res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"this ticket_status is not available"});
              return;  
        }
        else{
               if(Object.keys(req.body).length!=1)
               {
                      res.status(RESPONSE_STATUS.BAD_REQUEST).send({error:"Required fields not available"});
                      return;
               }
            
        }

        
  }
  catch(err:any|unknown)
  {
      res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To get request"+err.message});
  }
  next();
}

