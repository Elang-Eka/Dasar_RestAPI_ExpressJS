import product from "../models/model.js"

export const getProducts = async (req, res) => {
    try {
        const products = await product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const saveProducts = async (req, res) => {
    const products = new product(req.body);
    try {
        const saveProducts = await products.save();
        res.status(201).json(saveProducts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getProductById = async (req,res) => {
    try{
        const products = await product.findById(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const updateProduct = async (req,res) => {
    try {
        const updateProducts = await product.updateOne({_id: req.params.id},{ $set: req.body });
        res.status(200).json({status: updateProducts,message: "Data Berhasil diubah"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export const deleteProduct = async (req,res) => {
    const isAvailable = await product.findById(req.params.id);
    if(!isAvailable) return res.status(404).json({message: "data tidak ditemukan"});
    try{
        const deletedProducts = await product.deleteOne({ _id: req.params.id });
        res.status(200).json({status: deletedProducts,message: "Data Berhasil dihapus"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}