const express = require('express')
const router = express.Router()
const protected = require('../../middlewares/auth/authMiddleware')
const { 
    doRegister,
    doLogin,
    fetchAllUsers,
    doLogout,
    deleteUser,
    updateProfile,
    userProfile
 } = require('../../controllers/user/userControler')
//REGISTER USER
router.post('/register',doRegister)
//LOGIN USER
router.post('/login',doLogin)
//FETCH ALL USERS
router.get('/',fetchAllUsers)
//USER PROFILE
router.get('/profile/:id', protected, userProfile)
//UPDATE PROFILE
router.put('/profile', protected, updateProfile)
//DELETE USER
router.post('/logout',doLogout)
//DELETE USER
router.delete('/:id', protected, deleteUser)

module.exports = router