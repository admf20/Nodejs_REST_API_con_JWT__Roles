import Role from "../models/Role";
import UserModel from "../models/User";

export const CreatedUser = async (req, res) => {
 
    try {
        const { username, email, password, roles } = req.body;
    
        const RolesFound = await Role.find({name: {$in: roles}}) //capturamos el rol que nos estan dando desde el cliente
    
        const NewUser = new UserModel({
            username,
            email,
            password, 
            roles: RolesFound.map((role) => role._id)
        })
    
        NewUser.password = await User.EncryptPassword(NewUser.password) //encripto la contraseña
        const SavedUser = await NewUser.save()
    
        return res.json({
            status: 200,
            messages: "Usuario Creado",
            SavedUser
        })
    } catch (error) {
        res.json({status: 500, message: error.message})
    }
}

export const getUsers = async (req, res) => {
    const Users = await UserModel.find();
    res.json({
        status: 204,
        message: "Usuarios Encontrados",
        Users
    });
}

export const getUsersById = async (req, res) => {
    const User = await UserModel.findById(req.params.UserId)
    res.json({
        status: 204,
        message: "Usuario Encontrado",
        User
    });
}
