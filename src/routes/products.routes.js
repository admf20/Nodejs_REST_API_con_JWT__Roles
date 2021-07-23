import {Router} from "express";
const router = Router();

import { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } from '../controllers/products.controllers' 
import {AuthJwt} from "../middlewares/Index";

router.route('/')
            .get(getProducts)
            .post([AuthJwt.VerifyToken, AuthJwt.IsModerator] ,createProducts)

router.route('/:productId')
            .get(getProductsById)
            .put([AuthJwt.VerifyToken, AuthJwt.IsModerator], updateProducts)
            .delete([AuthJwt.VerifyToken, AuthJwt.IsModerator], deleteProducts)

export default router;