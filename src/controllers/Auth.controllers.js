import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const SignIn = async (req,res) => {  //iniciar seccion
    const {username,email, password, roles} = req.body;

    const UserFound = await User.findOne({ email: email }).populate('roles'); //validacion del usuario

    if(!UserFound) return res.json({
        status: 400,
        messages: "Usuario Incorrecto"
    })

    const MatchPassword = await User.ComparePassword(password, UserFound.password) //validacion de la contraseña

    if(!MatchPassword) return res.json({
        status: 400,
        messages:'Contraseña Incorrecta'
    })

    const token = jwt.sign({id: UserFound._id}, config.SECRET, { //generamos el token
        expiresIn: 86400
    })

    res.json({token})
}

export const SignUp = async (req,res) => {  //registrar usuario
    const {username,email, password, roles} = req.body;

    const NewUser = new User({
        username,
        email,
        password: await User.EncryptPassword(password)
    });

    if(req.body.roles){
       const FounRole = await Role.find({name: {$in: roles}})  //TODO: buscamos en la tabla roles los usarios que esta ingresando desde el cliente y si encuentra 
       NewUser.roles = FounRole.map(roles => roles._id)         // se utiliza el metodo map para recorrer el resultado de la consulta y solo guardando el id de del role para el nuevo usuario
    }else {
        const role = await Role.findOne({name: 'User'})       /// si el cliente no tiene ningun rolo se le pone por defecto al role 'User'
        NewUser.roles = [roles._id]
    }

    const SavedUser = await NewUser.save(); //creamos el usuario
    
    const token = jwt.sign({id: SavedUser._id}, config.SECRET,{
        expiresIn: 86400 // 24 horas
    });

    /**
     * TODO: Utilizamos la libreria jsonwebtoken y utilizamos el metodo sigin que recibe 3 parametros:
    // 1 - El primer parametro, es el id del usuario en el cual se le va a crear el token
    // 2 - El segundo parametro es, la palabra clave
    // 3 - El tercer parametro es, es el tiempo que tiene el token para expirar que en este caso son 24 horas
     */
    
    res.json({
        status: 200,
        messages: "Token Creado",
        token
    });
}