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
    id?:string,
    user_name?:string,
    password?:string,
    role?:string,
    tokenUser_name?:string
    token?:string
}
export interface extendUserForRequest extends Request{
    user:users,
    ticket_id?:string
}

export interface extendTicketForRequest extends Request{
    ticket:tickets
}
export interface userOutputs{
    status: number,
    message?: string,
    user?: users
  }
  export interface ticketInfoOutput{
      status:number,
      message?:string,
      ticket?:tickets
  }