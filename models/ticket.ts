
 import {client1} from "../database/db";
 export const execute1 = async (query:any) => {
     try {
        
         await client1.query(query);
     
         return true;
     } catch (error:any) {
         console.error(error.stack);
         return false;
     }
 };
 
 export const text1 = `
     CREATE TABLE IF NOT EXISTS "tickets" (
         "ticket_id" varchar(100) NOT NULL,
         "user_id" varchar(100) NOT NULL,
         "ticket_description" VARCHAR(100) NOT NULL,
         "ticket_status" VARCHAR (100) NOT NULL,
         "created_at" timestamp NOT NULL,
         "modified_at" timestamp NOT NULL,
         "created_by" VARCHAR(100) NOT NULL,
         "ticket_status_changed_by" VARCHAR(100) NOT NULL,
         "is_deleted" boolean DEFAULT false NOT NULL,
         CONSTRAINT ticket
         PRIMARY KEY ("ticket_id"),
            FOREIGN KEY("user_id") 
	        REFERENCES users("user_id")
     );`;
 
 