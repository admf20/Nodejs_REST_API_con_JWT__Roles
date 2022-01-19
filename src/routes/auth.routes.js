import {Router} from 'express';
const router = Router();

import * as AuthCrl from "../controllers/Auth.controllers";
import {VerifySignup} from "../middlewares"

router.post('/SignUp', VerifySignup.CheckDuplicateUsernameOrEmail,
                       VerifySignup.CheckRolesExisted, 
                       AuthCrl.SignUp); //TODO: registrando usuario

router.post('/SignIn', AuthCrl.SignIn);//TODO: iniciando seccion

export default router;

