const User = require('../../model/User/UserModel')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const generateToken = require('../../config/token /generateToken.js')
const validateMongodbId = require('../../utils/validateMongodbID.js')

//========================|| User Register  ||========================
// @route POST => /api/users/register
//====================================================================
const doRegister = asyncHandler(async (req, res) => {
    const { fullName, email, password, profession, phone } = req.body
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(409)
        throw new Error('User already exists')
    }
    //Create new user
    try {
        const user = await User.create({
            fullName,
            email,
            phone,
            profession,
            password: hashedPassword
        })
        //generate access and refresh tokens
        const accessToken = generateToken(user._id)
        // pass user into client
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            roles: user.roles,
            accessToken,
            isSuccess: true
        })
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| User Login ||========================
// @route POST => /api/users/login
//====================================================================
const doLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    //Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401)
        throw new Error('Login credentials not found')
    }
    // Check if password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        //generate access and refresh tokens
        const accessToken = generateToken(user._id)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePhoto: user.profilePhoto,
            roles: user.roles,
            accessToken,
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})
//========================|| Fetch All Users ||========================
// @route GET => /api/users
//====================================================================
const fetchAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| User Logout ||========================
// @route POST => /api/users/logout
//====================================================================
const doLogout = asyncHandler(async (req, res) => {
    try {
        res.status(200).json({ status: true })
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| Delete user||========================
// @route DELETE => /api/users
//====================================================================
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)   //Check if user id is valid
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            res.status(401)
            throw new Error(`User ID - ${id} not found`)
        }
        res.status(200).json(deletedUser)
    } catch (error) {
        throw new Error(error.message)
    }
})
//========================|| get user profile||========================
// @route GET => /api/users/profile/:id
//====================================================================
const userProfile = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)  //Check if user id is valid
    try {
        const myProfile = await User.findById(id)
        if (!myProfile) throw new Error("User Not Fount")
        res.status(200).json(myProfile)
    } catch (error) {
        res.json(error);
    }
})
//========================|| Update user profile||========================
// @route PUT => /api/users/profile
//====================================================================
const updateProfile = asyncHandler(async (req, res) => {
    const { id } = req.user  // user from auth middleware
    validateMongodbId(id) //Check if user id is valid 
    try {
        const user = await User.findByIdAndUpdate(id, {
            fullName: req?.body?.fullName,
            email: req?.body?.email,
            phone: req?.body?.phone,
            profession: req?.body?.profession
        }, {
            new: true,
            runValidators: true
        })
        res.status(200).json(user)
    } catch (error) {
        throw new Error(error.message)
    }
})
module.exports = {
    doRegister,
    doLogin,
    fetchAllUsers,
    doLogout,
    deleteUser,
    updateProfile,
    userProfile
}