import { Schema, model } from "mongoose";

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
        ref: 'Role',   //estamos haciendo la relacion de usuario con role
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps: true,
    versionKey: false
});

export default model('Users', UserSchema);

//para hacer la relacion seria propiedades que seria "ref" y el "type"
// ref:  hace refencia a cual modelo queremos hacer referncia en este caso el modelo "Roles"
// type: es el tipo de dato que queremos hacer relacion con el modelo users   

// ejemplo de como seria el modelo Role
// {name: "Admin", _id: "sda5sdas1da1s5d1as"}