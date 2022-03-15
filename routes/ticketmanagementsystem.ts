import express from 'express';

const router:any = express.Router();
import {registerUser,loginUser,raise_Ticket,all_Ticket,delete_Ticket,all_Ticket_History,update_Ticket} from '../controllers/userController';
import {update_Status} from '../controllers/adminController';
import {auth} from '../services/loginService'
import {validateLoginUser, validateRaise_Ticket, validateRegisterUser, validateUpdate_Status, validateUpdate_Ticket} from '../controllers/validController'

router.post("/register",validateRegisterUser,registerUser);

router.post("/login",validateLoginUser,loginUser);

router.post("/raiseTicket",validateRaise_Ticket,auth,raise_Ticket);

router.get("/getTickets",auth,all_Ticket);

router.put("/updateStatus/:ticket_id",validateUpdate_Status,auth,update_Status);

router.delete("/deleteTicket/:ticket_id",auth,delete_Ticket);

router.get("/getTicketsHistory",auth,all_Ticket_History);

router.put("/updateTicket/:ticket_id",validateUpdate_Ticket,auth,update_Ticket);

module.exports = router;