import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchUsersAction, updateUserAction } from "../../Redux/SlicesAndServices/user/usersSlice";

//Form Schema 
const nameRegex = /^[a-zA-Z ]*$/
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const formSchema = Yup.object({
    fullName: Yup.string().matches(nameRegex, 'Only alphabetic characters are allowed').max(15, 'Must be 15 characters or less').required('Full name is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10, 'Must be at least 10 characters').max(10, 'Maximum 10 characters allowed').required('Mobile number is required'),
    profession: Yup.string().required('Profession is required'),
})

const UpdateProfile = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    //fetch user details
    useEffect(() => {
        dispatch(fetchUsersAction(id));
    }, [dispatch, id]);

    //get user from store
    const users = useSelector(state => state.users);
    const { profile, isUpdated, loading, appErr, serverErr } = users;
console.log(users,"jjjjjjj")
    //formik
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: profile?.fullName,
            email: profile?.email,
            profession: profile?.profession,
            phone: profile?.phone,
        },
        onSubmit: values => {
            //dispath the action
            console.log(values,"initial ......")
            dispatch(updateUserAction(values))
        },
        validationSchema: formSchema,
    });

    //redirect

    if (isUpdated) return <Navigate to={`/profile/${id}`} />;
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h3 className="mt-6 text-center text-2xl font-extrabold text-gray-300">
                    Hei buddy{" "}
                    <span className="text-green-300">
                        {profile?.fullName}
                    </span>{" "}
                    Do want to update your profile?
                </h3>
                {/* ERR */}
                {serverErr || appErr ? (
                    <h2 className="text-red-300 text-center">
                        {serverErr} {appErr}
                    </h2>
                ) : null}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={formik.handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <div className="mt-1">
                                {/* First name */}
                                <input
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange("fullName")}
                                    onBlur={formik.handleBlur("fullName")}
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="firstName"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="text-red-500">
                                {formik.touched.fullName && formik.errors.fullName}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="mt-1">
                                {/* Email */}
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            {/* err msg */}
                            <div className="text-red-500">
                                {formik.touched.email && formik.errors.email}
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="bio"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Profession
                            </label>
                            <input
                                value={formik.values.profession}
                                onChange={formik.handleChange("profession")}
                                onBlur={formik.handleBlur("profession")}
                                rows="5"
                                cols="10"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                type="text"
                            ></input>
                            {/* Err msg */}
                            <div className="text-red-500">
                                {formik.touched.profession && formik.errors.profession}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Mobile
                            </label>
                            <div className="mt-1">
                                {/* First name */}
                                <input
                                    value={formik.values.phone}
                                    onChange={formik.handleChange("phone")}
                                    onBlur={formik.handleBlur("phone")}
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="firstName"
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className="text-red-500">
                                {formik.touched.phone && formik.errors.phone}
                            </div>
                        </div>
                        <div>
                            {/* submit btn */}
                            {loading ? (
                                <button
                                    disabled
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 "
                                >
                                    Loading please wait...
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Update
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="mt-4 mb-3">
                        <div className="relative">
                            <div className="flex flex-col justify-center items-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
