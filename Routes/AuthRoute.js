const {Register,Login}=require('../Controllers/AuthController.js');
const express=require('express');
const { userVerification } = require('../Middlewares/AuthMiddleware.js');
const app=express();
const router=express.Router();
router.post('/',userVerification)
router.post('/register',Register);
router.post('/login',Login);
module.exports=router;