import { Schema, model } from "mongoose";
import brcrypt  from "bcryptjs";

const UserSchema = new Schema({
    username:{
        type: String, 
        unique: true
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    roles: [{
        ref: 'Role',   //estamos haciendo la relacion de usuario con Role
        type: Schema.Types.ObjectId
    }]
//para hacer la relacion seria propiedades que seria "ref" y el "type"
// ref:  hace refencia a cual modelo queremos hacer referncia en este caso el modelo "Roles"
// type: es el tipo de dato que queremos hacer relacion con el modelo users   

// ejemplo de como seria el modelo Role
// {name: "Admin", _id: "sda5sdas1da1s5d1as"}
},
{
    timestamps: true,
    versionKey: false
});

 UserSchema.statics.EncryptPassword = async (password) => { //metodo para encryptar la contraseña
    const salt = await brcrypt.genSalt(10);
    return await brcrypt.hash(password, salt);  //Aca retornamos la contrseña encriptada 
 }

 UserSchema.statics.ComparePassword = async (password, receivedPassword) => { //metodo para compara la contraseña
    return await brcrypt.compare(password, receivedPassword);  //utilizamos el metodo 'compare' para comparar con la contraseña en el metodo recive la contraseña que esta en la bd y la que el cliente esta mandando desde el fronted
 }

export default model('User', UserSchema);