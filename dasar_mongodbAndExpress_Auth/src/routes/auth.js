import express from "express";
import {
    getUsers,
    deleteUser,
    saveUsers,
    loginUser
}
    from '../controller/auth.controller.js'
    
const authRouter = express.Router();

authRouter.get('/', getUsers);
authRouter.delete('/:id', deleteUser);
authRouter.post('/register', saveUsers);
authRouter.post('/login', loginUser);

export default authRouter;