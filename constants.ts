export const ROLE:any={
  ADMIN:"admin",
  USER:"user"
}
export const TICKET_STATUS={
  APPROVE:"approve",
  REJECT:"reject"
}
export const RESPONSE_STATUS={
UNAUTHORIZED:401,
FORBIDDEN:403,
INTERNAL_SERVER_ERROR:500,
CONFLICT:409,
BAD_REQUEST:400,
SUCCESS:200,
NOT_FOUND:404
}
export const ROLE_USING_USERNAME:string=`SELECT role from users where user_name=$1`
export const TICKET_INFORMATION:string=`SELECT ticket_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets`
export const PASSWORD_USING_USERNAME:string=`SELECT password from users where user_name=$1`
export const INSERT_USER:string=`INSERT INTO "users" ("id","user_name","password", "role")VALUES ($1, $2,$3,$4)`
export const USERNAME_USING_USERNAME:string=`SELECT user_name from users where user_name=$1`
export const INSER_TICKET:string=`INSERT INTO "tickets" ("ticket_id","user_id","ticket_description","ticket_status", "created_at","modified_at","created_by","approved_by")VALUES ($1, $2,$3,$4,$5,$6,$7,$8)`
export const ID_USING_USERNAME:string=`SELECT id from users where user_name=$1`
export const UPDATE_TICKET_STATUS:string=`UPDATE tickets SET ticket_status=$1,modified_at=$2,approved_by=$3 where ticket_id=$4`
export const USERNAME_USING_ID:string=`SELECT user_name from users where id=$1`
export const TICKET_INFORMATION_OF_USER:string=`SELECT ticket_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets where user_id=$1`
export const USERID_USING_TICKETID:string=`SELECT user_id from tickets where ticket_id=$1`
export const STATUS_USING_TICKETID:string=`SELECT ticket_status from tickets where ticket_id=$1`
export const DELETE_TICKET_USING_TICKETID:string=`DELETE FROM tickets where ticket_id=$1`
export const TICKET_INFORMATION_HISTORY_OF_USER:string=`SELECT ticket_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets where user_id=$1 AND ticket_status=$2 OR ticket_status=$3`
export const TICKET_INFORMATION_HISTORY:string=`SELECT ticket_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets where ticket_status=$1 OR ticket_status=$2`
