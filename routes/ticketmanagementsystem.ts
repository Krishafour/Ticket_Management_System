import express from 'express';

const router:any = express.Router();
import {registerUser,loginUser,raise_Ticket,all_Ticket,delete_Ticket,all_Ticket_History,update_Ticket} from '../controllers/userController';
import {update_Status} from '../controllers/adminController';
import {auth} from '../services/loginService'
import {validateLoginUser, validateRaise_Ticket, validateRegisterUser, validateUpdate_Status, validateUpdate_Ticket} from '../controllers/validController'

router.post("/register",validateRegisterUser,registerUser);

router.post("/login",validateLoginUser,loginUser);

router.post("/raise_ticket",validateRaise_Ticket,auth,raise_Ticket);

router.get("/get_tickets",auth,all_Ticket);

router.put("/update_status/:ticket_id",validateUpdate_Status,auth,update_Status);

router.delete("/delete_ticket/:ticket_id",auth,delete_Ticket);

router.get("/get_tickets_history",auth,all_Ticket_History);

router.put("/update_ticket/:ticket_id",validateUpdate_Ticket,auth,update_Ticket);

module.exports = router;