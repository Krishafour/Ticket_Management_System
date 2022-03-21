import {registration,login,raise_A_Ticket,all_Ticket_Info,deleteTicket,allTicketHistory,updateTicket} from'../services/userService';
import { Request, Response, NextFunction } from 'express';
require("dotenv").config();
import {RESPONSE_STATUS} from '../constants'
import { extendAllForRequest,userOutputs,ticketInfoOutput, extendUserForRequest, user} from '../returnTypes';

/**
 * This function is used to register the user by
 *
 * @param {extendUserForRequest} req  is of extendUserForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */
 export let registerUser:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
    try
      {
            
            const resData:userOutputs=await registration(req.body);
            if(resData.message)
                  res.status(resData.status).json(resData.message);
      }
      catch(err:any|unknown)
      {
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({message:"failed To register"+err.message});
      }
}

/**
 * This function is used to login the user by user or admin
 *
 * @param {extendUserForRequest} req  is of extendUserForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */
export let loginUser:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
    try
      {
            const resData:userOutputs=await login(req.body);
            if(resData.message)
            {     
                  res.status(resData.status).json(resData.message);
            }      
      }
      catch(err:any|unknown)
      {          
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({message:"failed To login "+err.message});
      }
}

/**
 * This function is used to raise a ticket of user  by the user
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */
export let raise_Ticket:Function=async(req: extendAllForRequest,res:Response):Promise<void>=>{
      try
      {
            const resData:userOutputs=await raise_A_Ticket(req.body,req.tokendata);
            if(resData.message)
            {     
                  res.status(resData.status).json(resData.message);
            }      
            
      }
      catch(err:any|unknown)
      {
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({message:"failed To Raise A Ticket"+err.message});
      }
  }

  /**
 * This function is used to get all ticket information of user by admin or user
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */
  export let all_Ticket:Function=async(req:extendAllForRequest,res:Response):Promise<void>=>{
      try
      {
              const resData:ticketInfoOutput=await all_Ticket_Info(req.tokendata);
              if(resData.message)
                  res.status(resData.status).json(resData.message);
              else
                  res.status(resData.status).json(resData.ticket); 
      }
      catch(err:any|unknown)
      {
          res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Get Tickets Information"+err.message});
      }
  }
  /**
 * This function is used to delete a ticket of user by user or admin
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */
  export let delete_Ticket:Function=async(req:extendAllForRequest,res:Response):Promise<void>=>{
      try
      {
              const resData:ticketInfoOutput=await deleteTicket(req.params,req.tokendata);
              if(resData.message)
                  res.status(resData.status).json(resData.message);
      }
      catch(err:any|unknown)
      {
          res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To delete Ticket "+err.message})
      }
  }
  /**
 * This function is used to get all ticket history of user by admin or user
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */
  export let all_Ticket_History:Function=async(req:extendAllForRequest,res:Response):Promise<void>=>{
      try
      {
              const resData:ticketInfoOutput=await allTicketHistory(req.tokendata);
              if(resData.message)
                  res.status(resData.status).json(resData.message);
              else
                  res.status(resData.status).json(resData.ticket); 
      }
      catch(err:any|unknown)
      {
          res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Get Tickets Information"+err.message});
      }
  }
  /**
 * This function is used to update ticket of user by user
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */
  export let update_Ticket:Function=async(req:extendAllForRequest,res:Response):Promise<void>=>{
    try
    {
        
            const resData:ticketInfoOutput=await updateTicket(req.params,req.body,req.tokendata);
            if(resData.message)
                res.status(resData.status).json(resData.message);
            
    }
    catch(err: any|unknown)
    {
        res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Update Ticket "+err.message})
         console.log(err);
    }
}