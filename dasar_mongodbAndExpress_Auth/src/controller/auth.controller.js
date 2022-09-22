import User from "../models/auth.model.js"
import bcrypt from 'bcryptjs';
import joi from "@hapi/joi";
import jwt from "jsonwebtoken";

const registerValidation = (user) => {
    const schema = joi.object({
        username: joi.string()
        .required(),
        password: joi.string()
        .min(8)
        .max(12)
        .required(),
        email: joi.string()
        .email()
        .required()
    })

    return schema.validate(user);
};

const loginValidation = (user) => {
    const schema = joi.object({
        email: joi.string()
        .email()
        .required(),
        password: joi.string()
        .min(8)
        .max(12)
        .required()
    })

    return schema.validate(user);

};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const saveUsers = async (req, res) => {

    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // jika email sudah digunakan
    const emailIsAvailable = await User.findOne({email: req.body.email});
    if(emailIsAvailable) return res.status(400).json({
        status: res.statusCode,
        message: "Email sudah digunakan !!!"
    })

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const users = new User({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email
    });
    try {
        const saveUsers = await users.save();
        res.status(201).json(saveUsers);
    } catch (error) {
        res.status(400).json({ status: res.statusCode , message: "Gagal membuat user baru" });
    }
}

export const deleteUser = async (req,res) => {
    const isAvailable = await User.findById(req.params.id);
    if(!isAvailable) return res.status(404).json({message: "data tidak ditemukan"});
    try{
        const deletedUsers = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deletedUsers);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

//login
export const loginUser = async (req,res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({
        status: res.statusCode,
        message: error.details[0].message
    })

    // cek email
    const users = await User.findOne({email: req.body.email});
    // console.log({email: req.body.password})
    if(!users) return res.status(400).json({
        status: res.statusCode,
        message: "Email anda salah"
    })

    // check password
    const validPwd = await bcrypt.compare(req.body.password, users.password)
    if(!validPwd) return res.status(400).json({
        status: res.statusCode,
        message: 'Password Anda Salah!'
    })

    //token
    const token = jwt.sign({ _id: User.id }, process.env.SECRET_KEY)
    res.header('auth-token',token).json({
        message: "Berhasil Login",
        token: token
    })
}