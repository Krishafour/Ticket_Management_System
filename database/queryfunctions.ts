import { QueryResult} from "pg";
import { client1 } from "./db";

export let databaseOperation:Function=async(Query: string, array?:((string | Date | undefined) [] )| string ): Promise<QueryResult>=>{
    const ans:QueryResult = await client1.query(Query, array);
    return ans;
}