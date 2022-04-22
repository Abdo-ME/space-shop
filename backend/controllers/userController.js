
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
    // -------------------------------------------------------------
    // Or we can use matchPassword is a method model from  the userShcema 
    const PasswordsMatched =user? await user.matchPassword(password):false
    
    if (user && PasswordsMatched ) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        
    } else {
        res.status(401);
        throw new Error ('Invalid email or password')
    }
  
})



//@desc    Register a new user
//@route    POST /api/users
//@access    Public
const registerUser = asyncHandler( async(req, res) => {
    const {name,email,password} = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error ('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
  
})

//@desc     Get user Profile
//@route    GET /api/users/profile
//@access    Privet
const getUserProfile = asyncHandler( async(req, res) => {

    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc     Update user Profile
//@route    Put /api/profile
//@access    Privet
const updateUserProfile = asyncHandler( async(req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
       user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password 
        }
        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


export {authUser,registerUser,getUserProfile,updateUserProfile}