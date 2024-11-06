import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import validator from 'validator';


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async(req,res)=>{
    const {name,password,email} = req.body;

    try{

        const exist = await userModel.findOne({email});

        if(exist)
        {
            return res.json({
                success:false,
                message:"User Already Exists"
            })
        }

        if(!validator.isEmail(email))
        {
            return res.json({
                success:false,
                message:"Enter a valid email id"
            })
        }

        if(password.length<8)
        {
            return res.json({
                success:false,
                message:"Please enter a strong password"
            })
        }

        const salt =  await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save();

        const token = createToken(user._id);

        return res.json({
            success:true,
            token
        })
    }catch(error){
        console.log(error);
        return res.json({
            success:false,
            message:error
        })
    }

}


// login user
const loginUser = async (req,res)=>{

    const {email,password} = req.body;

    try{

    const user = await userModel.findOne({email});

    if(!user)
    {
       return res.json({
            success:false,
            message:"User does not exist"
        })
    }

    const isMatching = await bcrypt.compare(password,user.password);

    if(!isMatching)
    {
        return res.json({
            success:false,
            message:"Invalid password"
        })
    }

    const token = createToken(user._id);

    return res.json({
        success:true,
        token
    })

}catch(error)
{
    console.log(error);
    return res.json({
        success:false,
        message:error
    })
}

}



export {loginUser, registerUser}