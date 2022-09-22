import express from "express";
import mongoose from"mongoose";
import router from "./src/routes/route.js";
import authRouter from "./src/routes/auth.js";
import cors from "cors";
import "dotenv/config";

const app = express();
 
// middleware 
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_CONN, {
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Database Connected'));

//router
app.use('/auth',authRouter);
app.use('/product',router);
 
// listening to port
app.listen(process.env.PORT,()=> console.log('Server Running at port: 3000'));