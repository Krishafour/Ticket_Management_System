import {updateStatus} from'../services/adminService';
import { Request, Response, NextFunction } from 'express';
import {RESPONSE_STATUS} from '../constants'
import { extendAllForRequest, ticketInfoOutput } from '../returnTypes';


/**
 * This function is used to update ticket status by admin
 *
 * @param {extendAllForRequest} req  is of extendAllForRequest which extends express.Request
 * @param {Response} res is of express.Response
 * @returns {Promis<void>}  this function is not return promise
 */

export let update_Status:Function=async(req:extendAllForRequest,res:Response):Promise<void>=>{
    try
    {
            const resData:ticketInfoOutput=await updateStatus(req.params,req.body,req.tokendata);
           
            if(resData.message)
                res.status(resData.status).json(resData.message);
            
    }
    catch(err:any|unknown)
    {
        res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Update Tickets Status"+err.message})
    }
}