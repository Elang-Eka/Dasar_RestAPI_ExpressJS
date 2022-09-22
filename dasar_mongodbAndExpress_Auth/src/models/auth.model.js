import mongoose from "mongoose";

const user = mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 255
        
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 12
    },
    email: {
        type:String,
        required: true,
        max: 255
    }
},
{
    timestamps: { createdAt: 'created_at' }
});

export default mongoose.model('Users', user);