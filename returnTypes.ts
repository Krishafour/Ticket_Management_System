import { Request } from "express";
import { QueryResult } from "pg";

export type tickets={
    ticket_id:string,
    user_id?:string|undefined,
    ticket_description:string,
    ticket_status:string,
    created_at?:Date|undefined,
    modified_at?:Date|undefined,
    created_by?:string|undefined,
    ticket_status_changed_by?:string|undefined
}

export type users={
    user_id?:string|undefined,
    user_name?:string|undefined,
    password?:string|undefined,
    role?:string|undefined,
   
}
export type messageDescription={
    error?:string|undefined,
    token?:string|undefined,
    ticket_id?:string|undefined,
    succsses_message?:string|undefined,
    user_id?:string|undefined,
    user_name?:string|undefined
}
export interface extendAllForRequest extends Request{
    user?:users|undefined,
    ticket?:tickets|undefined,
    tokendata:tokenData
 }
 export interface extendUserForRequest extends Request{
    user?:users|undefined
 }


export interface userOutputs{
    status: number,
    message?: messageDescription,
    user?: users
  }
  export interface ticketInfoOutput{
      status:number,
      message?:messageDescription|undefined,
      ticket?:tickets|undefined|any[],

  }
  export interface jwtPayload extends Request{
      user_id:string,
      user_name:string,
      role:string,
      iat:number,
      exp:number
  }
  export interface tokenData extends Request{
      user_id:string;
      user_name:string;
      role:string
  }
  export type user={
        user_id?:string|undefined,
        user_name:string,
        password:string,
        role:string,
       
    
  }
  