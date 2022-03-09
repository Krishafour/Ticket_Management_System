import { Request, Response, NextFunction } from 'express';
const jwt=require('jsonwebtoken');
require("dotenv").config();
import { RESPONSE_STATUS } from '../constants';
import { extendUserForRequest } from '../returnTypes';

export const auth= (req:extendUserForRequest, res:Response, next:NextFunction) => {
    const { authorization } = req.headers;
    //authorization === Bearer <token>
    if (!authorization) {
      return res.status(RESPONSE_STATUS.UNAUTHORIZED).send({ error: "Unauthorized" });
    }

    const token = authorization.replace("Bearer ", "");
    if(!token)
     {
       return res.status(RESPONSE_STATUS.NOT_FOUND).send({error:"Token Not found"});
     }
    jwt.verify(token,process.env.SECRET_KEY, async (err:any, payload:any) => {
    if (err)
    {
        return res.status(RESPONSE_STATUS.UNAUTHORIZED).send({ error: "token expired" });
    }
    const { user }= payload;
   req.body.tokenUser_name=user;
    next();
    });
  };