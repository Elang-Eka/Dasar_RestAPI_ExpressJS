import express from "express";
import jwt from "jsonwebtoken";
import {
    getProducts,
    getProductById,
    saveProducts,
    updateProduct,
    deleteProduct
}
    from '../controller/controller.js';

const router = express.Router();

const verifyTokens = (req, res, next) => {
    const token = req.header('auth-token')

    if(!token) return res.status(400).json({
        status: res.statusCode,
        message: "Access Denied!!!"
    })

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();

    } catch (error){
        res.status(400).json({
            status: res.statusCode,
            message: "Invalid Token!!!"
        })
    }
}

router.get('/', verifyTokens, getProducts);
router.get('/:id', verifyTokens, getProductById);
router.post('/tambahProduct', verifyTokens ,saveProducts);
router.patch('/editProduct/:id', verifyTokens, updateProduct);
router.delete('/deleteProduct/:id', verifyTokens, deleteProduct);

export default router;