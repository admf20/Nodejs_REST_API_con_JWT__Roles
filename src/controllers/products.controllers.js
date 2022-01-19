import ProductModel from "../models/Products";

export const getProducts = async (req, res) => {
    try{
        const Products = await ProductModel.find();

        if(Products.length > 0){
            res.json({
                status: 204,
                message: "Productos Encontrados",
                data: Products
            });
        }else{
            res.json({
                status: 200,
                message: "No hay Productos"
            })
        }
    }catch (err) {
        res.json({
            message: err.message,
            status: 500
        })
    }
}

export const getProductsById = async (req, res) => {
    const Product = await ProductModel.findById(req.params.productId)
    res.json({
        status: 204,
        message: "Producto Encontrado",
        Product
    });
}

export const createProducts = async (req, res) => {
    const {name, model, category, price, imageUrl} = req.body;

    const NewProduct = new ProductModel({
        name,
        model,
        category,
        price,
        imageUrl
    });

    // usuario: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzJiZTViMGFmYTRhMmUxODZiMTE4MCIsImlhdCI6MTY0MDE1NDYxOCwiZXhwIjoxNjQwMjQxMDE4fQ.XjSAAa8a8Oraamung_iuaQpxNzw4v0bI1pnHEC0xmKw
    // admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYzJiZDgxMGFmYTRhMmUxODZiMTE3ZSIsImlhdCI6MTY0MDE1NDczMCwiZXhwIjoxNjQwMjQxMTMwfQ.-7PgDyE0yCtzlKdR7U7p2fTkT7NwG_G33BguSdC7YEI
    const ProductSaved = await NewProduct.save();
    res.json({
        message: "Producto Guardado",
        status: 201,
        ProductSaved
    });
}

export const updateProducts = async (req, res) => {
    const {name, model, category, price, imageUrl} = req.body;

    const updateProduct = await ProductModel.findByIdAndUpdate(req.params.productId, req.body, {
         new: true }); //para que me devuelva el nuevo dato actualizado
    
    res.json({
        message: "Producto Actualizado",
        status: 201,
        updateProduct
    });
}

export const deleteProducts = async (req, res) => {
    await ProductModel.findByIdAndDelete(req.params.productId)
    res.json({
        status: 204,
        message: "Producto Eliminado"
    });
}
