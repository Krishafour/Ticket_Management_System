import {updateStatus} from'../services/adminService';
import { Request, Response, NextFunction } from 'express';
import {RESPONSE_STATUS} from '../constants'
import { extendUserForRequest, ticketInfoOutput } from '../returnTypes';




export let update_Status:Function=async(req:extendUserForRequest,res:Response):Promise<void>=>{
    try
    {
        //send required req.body
            const resData:ticketInfoOutput=await updateStatus(req);
            if(resData.message)
                res.status(resData.status).json(resData.message);
            
    }
    catch(err:any)
    {
        res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Update Tickets Status"+err.message})
    }
}