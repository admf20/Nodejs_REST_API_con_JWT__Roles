import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const SignIn = async (req,res) => {
    const {username,email, password, role} = req.body;

    console.log(req.body);
    res.json('SignIn');
}

export const SignUp = async (req,res) => {
    const {username,email, password, role} = req.body;

    const NewUser = new User({
        username,
        email,
        password: await User.EncryptPassword(password)
    });

    const SavedUser = await NewUser.save();
    
    const token = jwt.sign({id: SavedUser._id}, config.SECRET,{
        expiresIn: 86400 // 24 horas
    });
    //Utilizamos la libreria jsonwebtoken y utilizamos el metodo sigin que recibe 3 parametros
    // el primer parametro, es el id del usuario en el cual se le va a crear el token
    // el segundo parametro es, la palabra clave
    // el tercer parametro es, es el tiempo que tiene el token para expirar que en este caso son 24 horas
    
    res.json({
        status: 200,
        messages: "Token Creado",
        token
    });
}