import {all_ticket_info} from'../services/adminService';
import { Request, Response, NextFunction } from 'express';


export let all_ticket:Function=async(req:Request,res:Response):Promise<void>=>{
    try
    {
            const resdata:Array<string>=await all_ticket_info();
            if(resdata)
                res.status(200).send(resdata);
            else
                res.status(404).send("Do not have any Ticket"); 
    }
    catch(err:any)
    {
        res.status(500).send({message:"failed To Get Tickets Information"+err.message})
    }
}