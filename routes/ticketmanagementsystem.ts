import express from 'express';

const router:any = express.Router();
import {registerUser,loginUser,raise_ticket} from '../controllers/userController';
import {all_ticket} from '../controllers/adminController';
import {auth} from '../services/loginService'
import {validate} from '../controllers/validController'

router.post("/register",validate,registerUser);
router.post("/login",loginUser);
router.post("/user/raise_ticket",auth,raise_ticket);
router.get("/admin/all_tickets",auth,all_ticket);

module.exports = router;