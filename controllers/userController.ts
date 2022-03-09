import {registration,login,raise_A_Ticket,all_Ticket_Info,deleteTicket,allTicketHistory} from'../services/userService';
import { Request, Response, NextFunction } from 'express';
require("dotenv").config();
import {RESPONSE_STATUS} from '../constants'
import { extendTicketForRequest, extendUserForRequest,userOutputs,ticketInfoOutput} from '../returnTypes';


 export let registerUser:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
    try
      {
            
            const resData:userOutputs=await registration(req);
            if(resData.message)
                  res.status(resData.status).json(resData.message);
            else
             res.status(resData.status).json(resData.user+"   User Registered Successfully")
              
      }
      catch(err:any)
      {
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({message:"failed To register"+err.message});
      }
}


export let loginUser:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
    try
      {
            const resData:userOutputs=await login(req);
            if(resData.message)
            {     
                  res.status(resData.status).json(resData.message);
            }      
      }
      catch(err:any)
      {          
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({message:"failed To login "+err.message});
      }
}


export let raise_Ticket:Function=async(req: extendTicketForRequest,res:Response):Promise<void>=>{
      try
      {
            const resData:userOutputs=await raise_A_Ticket(req);
            if(resData.message)
            {     
                  res.status(resData.status).json(resData.message);
            }      
            
      }
      catch(err:any)
      {
            res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({message:"failed To Raise A Ticket"+err.message});
      }
  }
  export let all_Ticket:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
      try
      {
              const resData:ticketInfoOutput=await all_Ticket_Info(req);
              if(resData.message)
                  res.status(resData.status).json(resData.message);
              else
                  res.status(resData.status).json(resData.ticket); 
      }
      catch(err:any)
      {
          res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Get Tickets Information"+err.message})
      }
  }

  export let delete_Ticket:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
      try
      {
              const resData:ticketInfoOutput=await deleteTicket(req);
              if(resData.message)
                  res.status(resData.status).json(resData.message);
      }
      catch(err:any)
      {
          res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Get Tickets Information"+err.message})
      }
  }
  export let all_Ticket_History:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
      try
      {
              const resData:ticketInfoOutput=await allTicketHistory(req);
              if(resData.message)
                  res.status(resData.status).json(resData.message);
              else
                  res.status(resData.status).json(resData.ticket); 
      }
      catch(err:any)
      {
          res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Get Tickets Information"+err.message})
      }
  }