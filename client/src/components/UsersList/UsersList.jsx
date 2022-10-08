import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersAction ,deleteProfileAction} from "../../Redux/SlicesAndServices/user/usersSlice";

function UsersList() {
    const dispatch = useDispatch()
    // data from store
    const users = useSelector(state => state?.users)
    const { userList, appErr, serverErr, loading, block, unblock } = users
    // fetch all users
    useEffect(() => {
        dispatch(fetchUsersAction())
    }, [dispatch])

    return (
        <>
            <div className="lg:px-36 w-full mt-24">
                <div className="px-4 md:px-10 py-4 md:py-7">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">All Users</p>

                    </div>
                </div>
                <div className="bg-white px-4 md:px-10 pb-5">
                    <div className="overflow-x-auto">
                        <table className="w-full whitespace-nowrap">
                            <tbody>
                                {userList?.map((user) => {
                                    return (
                                        <tr className="text-sm leading-none text-gray-600 h-16">
                                            <td className="w-1/3">
                                                <div className="flex items-center">
                                                    <img className="w-[50px] h-[50px]" src={user?.profilePhoto} alt="image" />
                                                    <div className="pl-2">
                                                        <p className="text-sm font-medium leading-none text-gray-800">{user?.fullName}</p>
                                                       
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="pl-16">
                                                <p>{user?.profession}</p>
                                            </td>
                                            <td>
                                                <p className="pl-16">{user?.email}</p>
                                            </td>
                                          
                                            <td>
                                                <p className="pl-16">{user?.phone}</p>
                                            </td>
                                            <td>
                                                <p onClick={()=>dispatch(deleteProfileAction(user?._id))} className="pl-16 text-red-500 cursor-pointer">delete</p>
                                            </td>
                                        </tr>
                                    )
                                })}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersList;
