import {  configureStore } from '@reduxjs/toolkit'
import usersReducer from '../SlicesAndServices/user/usersSlice'

const store = configureStore ({
    reducer : {
        users : usersReducer,
    }
})
export default store