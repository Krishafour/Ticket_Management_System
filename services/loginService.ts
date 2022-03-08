import { Request, Response, NextFunction } from 'express';
const jwt=require('jsonwebtoken');
require("dotenv").config();


export const auth= (req:any, res:Response, next:NextFunction) => {
    const { authorization } = req.headers;
    //authorization === Bearer <token>
    if (!authorization) {
      return res.status(401).send({ error: "Unauthorized" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token,process.env.SECRET_KEY, async (err:any, payload:any) => {
    if (err)
    {
        return res.status(401).send({ error: "token expired" });
    }
    const { user } = payload;
   req.user1=user;
    next();
    });
  };