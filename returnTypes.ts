import { Request } from "express";

export type tickets={
    ticket_id:string,
    user_id?:string,
    ticket_description:string,
    ticket_status?:string,
    created_at?:Date,
    modified_at?:Date,
    created_by?:string,
    approved_by?:string
}

export type users={
    user_id?:string,
    user_name?:string,
    password?:string,
    role?:string,
   
}
export type messageDescription={
    error?:string,
    token?:string,
    ticket_id?:string,
    succssesMessage?:string,
    user_id?:string
}
export interface extendAllForRequest extends Request{
    user?:users,
    ticket?:tickets,
    tokendata:tokenData
 }
 export interface extendUserForRequest extends Request{
    user?:users
 }


export interface userOutputs{
    status: number,
    message?: messageDescription,
    user?: users
  }
  export interface ticketInfoOutput{
      status:number,
      message?:messageDescription,
      ticket?:tickets
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
        user_id?:string,
        user_name:string,
        password:string,
        role:string,
       
    
  }