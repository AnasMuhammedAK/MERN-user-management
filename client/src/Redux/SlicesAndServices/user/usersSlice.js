import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import usersServiece from './usersService'
import privateAxios from '../../../utils/privateAxios'


// Redirect action
const resetUserAction = createAction("user/profile/reset");
//========================|| Register Action ||========================
export const registerUserAction = createAsyncThunk('users/register',
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            return await usersServiece.register(user)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//========================|| Login Action ||========================
export const loginUserAction = createAsyncThunk('users/login',
    async (user, { rejectWithValue, getState, dispatch }) => {
        try {
            return await usersServiece.login(user)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
//========================|| Logout Action ||========================
export const logoutUserAction = createAsyncThunk('users/logout',
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {

            const { refreshToken } = JSON.parse(localStorage.getItem('tokens'))
            return await usersServiece.logout(refreshToken)
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data)
        }
    })
export const deleteProfileAction = createAsyncThunk(
    "user/delete",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.delete(`/api/users/${id}`);

            return data;
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data);
        }
    }
);
export const updateUserAction = createAsyncThunk(
    "users/update",
    async (userData, { rejectWithValue, getState, dispatch }) => {
        try {
            console.log('userdata', userData)
            const { data } = await privateAxios.put(`/api/users/profile`,
                {
                    fullName: userData?.fulltName,
                    email: userData?.email,
                    mobile: userData?.mobile,
                    profession: userData?.profession
                });
            // dispatch
            dispatch(resetUserAction());
            return data;
        } catch (error) {
            if (!error?.response) throw error;
            return rejectWithValue(error?.response?.data);
        }
    }
);
export const userProfileAction = createAsyncThunk(
    "user/profile",
    async (id, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.get(`/api/users/profile/${id}`);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) throw error
            return rejectWithValue(error?.response?.data);
        }
    }
);
// Fetch All user
export const fetchUsersAction = createAsyncThunk("users/list",
    async (_, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await privateAxios.get(`/api/users`);
            console.log(data)
            return data;
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
//get user from localStorage to store
const userFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

//========================|| create user slices ||========================
const initialState = {}
const usersSlice = createSlice({
    name: 'users',
    initialState: {
        userAuth: userFromLocalStorage
    },
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(registerUserAction.pending, (state) => {
                state.loading = true
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(registerUserAction.fulfilled, (state, action) => {
                state.loading = false
                state.userAuth = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(registerUserAction.rejected, (state, action) => {
                state.loading = false
                state.appErr = action.payload.message
                state.serverErr = action.error.message
                state.userAuth = null
            })
            //login
            .addCase(loginUserAction.pending, (state) => {
                state.loading = true
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false
                state.userAuth = action.payload
                state.appErr = undefined
                state.serverErr = undefined
            })
            .addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false
                state.appErr = action.payload.message
                state.serverErr = action.error.message
                state.userAuth = null
            })
            // Profile
            .addCase(userProfileAction.pending, (state, action) => {
                state.profileLoading = true;
                state.profileAppErr = undefined;
                state.profileServerErr = undefined;
            })
            .addCase(userProfileAction.fulfilled, (state, action) => {
                state.profile = action?.payload;
                state.profileLoading = false;
                state.profileAppErr = undefined;
                state.profileServerErr = undefined;
            })
            .addCase(userProfileAction.rejected, (state, action) => {
                state.profileLoading = false;
                state.profileAppErr = action?.payload?.message;
                state.profileServerErr = action?.error?.message;
            })
            // update profile
            .addCase(updateUserAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(resetUserAction, (state, action) => {
                state.isUpdated = true;
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userUpdated = action?.payload;
                state.isUpdated = false;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })
            //logout
            .addCase(logoutUserAction.fulfilled, (state) => {
                state.loading = false
                state.userAuth = null
                state.appErr = undefined
                state.serverErr = undefined
            })
            // fetch All user
            .addCase(fetchUsersAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(fetchUsersAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userList = action?.payload;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(fetchUsersAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })
            // delete user
            .addCase(deleteProfileAction.pending, (state, action) => {
                state.loading = true;
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(deleteProfileAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userList.filter(
                    (user) => user._id !== action.payload._id
                )
                state.appErr = undefined;
                state.serverErr = undefined;
            })
            .addCase(deleteProfileAction.rejected, (state, action) => {
                state.loading = false;
                state.appErr = action?.payload?.message;
                state.serverErr = action?.error?.message;
            })
    },

})

export default usersSlice.reducer