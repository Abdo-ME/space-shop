
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";

//@desc     Auth user & get token
//@route    GET /api/users/login
//@access    Public
const authUser = asyncHandler( async(req, res) => {
    const {email,password} = req.body
    const user = await User.findOne({ email })
    //We can us decrypted Password directly 
    // const PasswordsMatched=await bcryptjs.compare(password,user.password) 
    // --------
    // Or we can use matchPassword is a method model from  the userShcema 
    const PasswordsMatched=(user.matchPassword(password))
    if (user && PasswordsMatched ) {
        
            res.json({
                _id: user._id,
                nam: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        
    } else {
        
        res.status(401);
        throw new Error ('Invalid email or password')
    }
  
})

//@desc     Auth user & get token
//@route    GET /api/users/login
//@access    Public
const getUserProfile = asyncHandler( async(req, res) => {
   
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            nam: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})



export {authUser,getUserProfile}