const {Client}=require('pg')
//import Client from 'pg';
export const client1=new Client({
host:"localhost",
port:"5432",
user:"postgres",
password:"krish123",
database:"ticket_management_system"
})
