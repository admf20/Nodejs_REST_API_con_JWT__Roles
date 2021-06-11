import ProductModel from "../models/Products";

export const getProducts = async (req, res) => {
    const Products = await ProductModel.find();
    res.json({
        status: 204,
        message: "Productos Encontrados",
        data: Products
    });
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
    const {name, category, price, imageUrl} = req.body;

    const NewProduct = new ProductModel({
        name,
        category,
        price,
        imageUrl
    });

    const ProductSave = await NewProduct.save();
    res.json({
        message: "Producto Guardado",
        status: 201,
        ProductSave
    });
}

export const updateProducts = async (req, res) => {
    const {name, category, price, imageUrl} = req.body;

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
