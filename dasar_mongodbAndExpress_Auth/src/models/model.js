import mongoose from "mongoose";

const product = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    jenis: {
        type:String,
        required: true
    }
},
{
    timestamps: { createdAt: 'created_at' }
});

export default mongoose.model('Products', product);