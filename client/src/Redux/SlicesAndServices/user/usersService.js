
import publicAxios from '../../../utils/publicAxios'
import privateAxios from '../../../utils/privateAxios'

//========================|| Register Service ||========================
const register = async (userData) => {
    const { data } = await publicAxios.post(`/api/users/register`, userData)
    //SAVE USER INTO LOCAL STORAGE
    if (data.isSuccess) {
        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('tokens', JSON.stringify({ accessToken: data.accessToken, refreshToken: data.refreshToken }))
        return data
    } else {
        return null
    }
}
//========================|| Login Service ||========================
const login = async (userData) => {
    const { data } = await publicAxios.post(`/api/users/login`, userData)
    //SAVE USER INTO LOCAL STORAGE
    if (data){
        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.setItem('tokens', JSON.stringify({accessToken:data.accessToken, refreshToken:data.refreshToken}))
        return data
    }
}
//========================|| Logout Service ||========================
const logout = async (refreshToken) => {
    const { data } =  await privateAxios.post(`/api/users/logout`, { refreshToken })
    if(data.status) {
     localStorage.removeItem('userInfo')
     localStorage.removeItem('tokens')
    } 
     return 
 }


const usersService = {
    register,
    login,
    logout
}
export default usersService

