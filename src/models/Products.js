import {Schema, model} from "mongoose";

const productSchema = new Schema({
    name: String,
    model: {
        type: String,
        unique: true
    },
    category: String,
    price: Number,
    imageUrl: String
}, {
    timestamps: true,
    versionKey: false
});

export default model('Products', productSchema);