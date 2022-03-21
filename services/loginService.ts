import { Request, Response, NextFunction } from 'express';
const jwt=require('jsonwebtoken');
require("dotenv").config();
import { RESPONSE_STATUS } from '../constants';
import { extendAllForRequest ,jwtPayload, tokenData} from '../returnTypes';

/**
 * 
 * This function is used to update ticket of user by user
 * 
 * @param {extendAllForRequest} req is of extendALlForRequest which jwt token of user in headers
 * @param {Response} res is of express.Response
 * @param {NextFunction} next is of express.NextFunction
 * @returns {Promis<void>}  this function is return promise of  void
 */


export const auth:Function= (req:extendAllForRequest, res:Response, next:NextFunction):Response<any, Record<string, any>>|undefined => {
    const { authorization } = req.headers;
    //authorization === Bearer <token>
    if (!authorization) {
      return res.status(RESPONSE_STATUS.UNAUTHORIZED).send({ error: "Unauthorized" });
    }
    const token:string = authorization.replace("Bearer ", "");
    if(!token)
     {
       return res.status(RESPONSE_STATUS.NOT_FOUND).send({error:"Token Not found"});
     }
    jwt.verify(token,process.env.SECRET_KEY, async (err:any|unknown, payload:jwtPayload) => {
    if (err)
    {
        return res.status(RESPONSE_STATUS.UNAUTHORIZED).send({ error: "token expired" });
    }
   
   req.tokendata=payload;
  
    next();
    });
  };