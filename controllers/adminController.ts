import {all_Ticket_Info} from'../services/adminService';
import { Request, Response, NextFunction } from 'express';
import {RESPONSE_STATUS} from '../constants'


export let all_Ticket:Function=async(req:Request,res:Response):Promise<void>=>{
    try
    {
            const resdata:Array<string>|boolean=await all_Ticket_Info(req);
            if(resdata==false)
                res.status(RESPONSE_STATUS.FORBIDDEN).send({message:"Forbidden, User is not allow to see all ticket information"});
            else
                res.status(RESPONSE_STATUS.SUCCESS).send(resdata); 
    }
    catch(err:any)
    {
        res.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).send({message:"failed To Get Tickets Information"+err.message})
    }
}