import {Router} from 'express';
const router = Router();

import * as AuthCrl from "../controllers/Auth.controllers";

router.post('/SignIn', AuthCrl.SignIn); //Registrar Usuario

router.post('/SignUp', AuthCrl.SignUp);  //Inicar Seccion

export default router;

