import express from 'express';

const router:any = express.Router();
import {registerUser,loginUser,raise_Ticket} from '../controllers/userController';
import {all_Ticket} from '../controllers/adminController';
import {auth} from '../services/loginService'
import {validate} from '../controllers/validController'

router.post("/register",validate,registerUser);

router.post("/login",loginUser);

router.post("/raise_ticket",auth,raise_Ticket);

router.get("/all_tickets",auth,all_Ticket);

module.exports = router;