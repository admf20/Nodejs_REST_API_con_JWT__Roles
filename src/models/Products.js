import {Schema, model} from "mongoose";

const productSchema = new Schema({
    name: {
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