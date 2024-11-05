import mongoose from "mongoose";


export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://hariiharan1411:opensesame@cluster0.mzmci.mongodb.net/baking-studio')
    .then(()=>{
        console.log('Connected to DB');
    })
}