import express from 'express';
import { any } from 'prop-types';
import swaggerUI from 'swagger-ui-express';
import {client1} from "./database/db";
import {execute,text} from "./models/user";
const swaggerDocs=require("./openAPIDocumentation/swagger.json");
const tms = require("./routes/ticketmanagementsystem");
const app = express();

const port = 3000;
client1.on("connect",()=>{
    console.log("connected to postgres");
});

client1.on("error", (err:any) => {
    console.log("this is error", err);
  });

client1.connect();
execute(text).then(result => {
    if (result) {
        console.log('Table created');
    }
    else{
        console.log('Table already exist');
    }
});

app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use("/", tms);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});