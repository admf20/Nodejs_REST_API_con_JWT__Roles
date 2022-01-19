import jwt from "jsonwebtoken";
import config from "../config";

import Role from "../models/Role";
import User from "../models/User";

export const VerifyToken = async (req, res, next) => {
    try {

        const token = req.headers["x-access-token"]

        if (!token) return res.json({  //validamos si nos estan dando el token por el 'headers'
            status: 403,
            message: 'No existe ningun token'
        })

        const decoded = jwt.verify(token, config.SECRET)  //validamos que el token dado por el cliente 
        req.UserId = decoded.id

        const user = await User.findById(req.UserId, {password: 0})

        console.log(`Id por el 'token' ${decoded.id} y el de 'user' ${user._id}`);
        
        if(!user) return res.json({
            status: 204,
            messages: 'Sección caducada. Por favor inicia otra vez sección...'
        })

        next()
    } catch (error) {
        res.json({
            status: 401,
            messages: 'No Autorizado',
            messages: error.message
        })
    }
}

export const IsModerator = async (req, res, next) => {
    try {
        const user = await User.findById(req.UserId)
        const roles = await Role.find({_id: {$in: user.roles}})

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'Moderator') {
                next()
                return
            }
        }
        return res.json({
            status: 403,
            messages: 'Requiere Usuario Moderator'
        })
    } catch (error) {
        res.json({
            message: error.message,
            status: 401})
    }
}

export const IsAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.UserId)
        const roles = await Role.find({_id: {$in: user.roles}})

        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === 'Admin') {
                next()
                return
            }
        }
        return res.json({
            status: 403,
            messages: 'Requiere Usuario Admin'
        })
    } catch (error) {
        res.json({status: 401})
    }
}