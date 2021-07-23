import {ROLES} from '../models/Role'
import User from '../models/User';

export const CheckRolesExisted = async (req, res, next) => {
    if(req.body.roles){
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])){
                return res.json({
                    status: 400,
                    messages: `El Role ${req.body.roles[i]} no existe`
                })
            }
        }
    }
    next();
}

export const CheckDuplicateUsernameOrEmail =  async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if(user) return res.json({
            status: 400,
            messages: "el usuario ya existe"
        })

        const email = await User.findOne({email: req.body.email})
        if(email) return res.json({
            status: 400,
            messages: "el username ya existe"
        })

        next()
    } catch (error) {
        res.json({status: 500, messages: error.message})       
    }
}