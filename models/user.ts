
 import {client1} from "../database/db";
export const execute = async (query:any) => {
    try {
       
        await client1.query(query);
    
        return true;
    } catch (error:any) {
        console.error(error.stack);
        return false;
    }
};

export const text = `
    CREATE TABLE IF NOT EXISTS "users" (
	    "user_id" varchar(100) NOT NULL,
	    "user_name" VARCHAR(100) NOT NULL,
        "password" VARCHAR (100) NOT NULL,
	    "role" VARCHAR(15) NOT NULL,
	    PRIMARY KEY ("id")
    );`;

