import Products from "../models/Products"

export const ProductoExistente = async (req, res, next) => {
    
    const product = await Products.findOne({model: req.body.model});

    if(product) return res.json({
        status: 400,
        messages: 'El Producto ya Existe; Por favor ingreso otro producto'
    })
    next()
}