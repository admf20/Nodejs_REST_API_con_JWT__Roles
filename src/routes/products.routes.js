import {Router} from "express";
const router = Router();

import { createProducts, deleteProducts, getProducts, getProductsById, updateProducts } from '../controllers/products.controllers' 

router.route('/')
            .get(getProducts)
            .post(createProducts)

router.route('/:productId')
            .get(getProductsById)
            .put(updateProducts)
            .delete(deleteProducts)

export default router;