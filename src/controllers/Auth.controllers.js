import User from "../models/User";

export const SignIn = async (req,res) => {
    const {username,email, password, role} = req.body;

    console.log(req.body);
}

export const SignUp = async (req,res) => {
    const {username,email, password, role} = req.body;

    console.log(req.body);
}