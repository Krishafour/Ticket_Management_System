
export const ROLE={
  ADMIN:"admin",
  USER:"user"
}
export const TICKET_STATUS={
  APPROVED:"approved",
  REJECTED:"rejected",
  PROGRESS:"progress",
  HOLD:"hold"
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


export const USER_TABLE_QUERIES={
   PASSWORD_USER_ID_ROLE_USING_USERNAME:`SELECT password,user_id,role from users where user_name=$1`,
   INSERT_USER:`INSERT INTO "users" ("user_id","user_name","password", "role")VALUES ($1, $2,$3,$4)`,
   USERNAME_USING_USERNAME:`SELECT user_name from users where user_name=$1`
}
export const TICKETS_TABLE_QUERIES={
 TICKET_INFORMATION:`SELECT ticket_id,user_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets where is_deleted=$1`,
 INSERT_TICKET:`INSERT INTO "tickets" ("ticket_id","user_id","ticket_description","ticket_status", "created_at","modified_at","created_by","approved_by")VALUES ($1, $2,$3,$4,$5,$6,$7,$8)`,
 UPDATE_TICKET_STATUS:`UPDATE tickets SET ticket_status=$1,modified_at=$2,approved_by=$3 where ticket_id=$4`,
 TICKET_INFORMATION_OF_USER:`SELECT ticket_id,user_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets where user_id=$1 AND is_deleted=$2`,
 DELETE_TICKET_USING_TICKETID:`UPDATE tickets SET is_deleted=$1,modified_at=$2 where ticket_id=$3`,
 TICKET_INFORMATION_HISTORY_OF_USER:`SELECT ticket_id,user_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets where user_id=$1 AND is_deleted=$2 AND ticket_status=$3 OR ticket_status=$4`,
 TICKET_INFORMATION_HISTORY:`SELECT ticket_id,ticket_description,ticket_status,created_at,modified_at,created_by,approved_by from tickets where ticket_status=$1 OR ticket_status=$2 AND is_deleted=$3`,
 TICKET_STATUS_USING_TICKET_ID:`SELECT ticket_status from tickets where ticket_id=$1  AND is_deleted=$2`,
 UPDATE_TICKET_DESCRIPTION:`UPDATE tickets SET ticket_description=$1,modified_at=$2 where ticket_id=$3`,
 USER_ID_USING_TICKET_ID:`SELECT user_id from tickets where ticket_id=$1`,
 IS_DELETED_USING_TICKET_ID:`SELECT is_deleted from tickets where ticket_id=$1`,
}
