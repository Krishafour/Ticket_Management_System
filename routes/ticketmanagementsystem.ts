import express from 'express';

const router:any = express.Router();
import {registerUser,loginUser,raise_Ticket,all_Ticket,delete_Ticket,all_Ticket_History} from '../controllers/userController';
import {update_Status} from '../controllers/adminController';
import {auth} from '../services/loginService'
import {validateRegisterUser} from '../controllers/validController'

router.post("/register",validateRegisterUser,registerUser);

router.post("/login",loginUser);

router.post("/raise_ticket",auth,raise_Ticket);

router.get("/all_tickets/:id",auth,all_Ticket);//status

router.put("/update_status",auth,update_Status);

router.delete("/delete_ticket/:ticket_id",auth,delete_Ticket);

router.get("/all_tickets_history/:id",auth,all_Ticket_History);

module.exports = router;