import Head from 'next/head'
import React, { useState } from 'react'
import helper from '../config/auth-helper'
// import axios from 'axios';
import { useCookies } from 'react-cookie'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCart } from '../redux/cart.slice'
import Router, { useRouter } from 'next/router'
import Loader from '../components/loader'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export default function Login() {
    const [type, setType] = useState('login');
    const [cookie, setCookie] = useCookies(['user'])
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const router = useRouter()
    const [loadingText, setLoadingText] = useState("Loading")
    const { register, formState: { errors }, handleSubmit } = useForm();

    if (cookie && cookie.user && Object.keys(cookie.user).length > 0) {
        // console.log(Object.keys(cookie.user).length && cookie.user)
        router.push(router.query.returnUrl || "/")
    }

    const onSignIn = (obj) => {
        setLoadingText("Account creation is in progress, please wait....");
        setLoader(true);
        helper.axiosInstance.post('auth/register', obj).then(async ({ data }) => {
            await onSuccess(data);

            helper.axiosInstance.post(`carts`, data)
                .then(resp => { setCookie('cart', JSON.stringify(resp.data), { path: "/", maxAge: 172800000, sameSite: true }) })
                .catch(err => console.log(err));
        }).catch(err => {
            setLoader(false);
        });
    }

    const onLogin = async (e) => {
        e.preventDefault();
        setLoadingText("We are authenticating... Please wait...");
        setLoader(true);
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const obj = { username: email, password }
        helper.axiosInstance.post(`auth/login`, obj).then(async ({ data }) => {
            console.log(data);
            await onSuccess(data);

            helper.axiosInstance.get(`carts`)
                .then(async (resp) => {
                    setCookie('cart', JSON.stringify(resp.data), { path: "/", maxAge: 172800000, sameSite: true });
                    await dispatch(fetchCart());
                    router.push(router.query.returnUrl || "/");
                }).catch(err => { setLoader(false); console.log(err) });
        }).catch(err => {
            console.log(err.data);
            setLoader(false);
        });
    }

    const onSuccess = async (user) => {
        const userObj = {
            email: user.email,
            firstName: user.firstName,
            id: user.id,
            lastName: user.lastName
        }
        localStorage.setItem('token', user.token);
        setCookie('user', JSON.stringify(userObj), { path: "/", maxAge: 172800000, sameSite: true })
        setCookie('token', user.token, { path: "/", maxAge: 172800000, sameSite: true })
        setLoader(false);
        return true;
    }

    const onForgotPassword = (e) => {
        e.preventDefault();
        setLoadingText("Mailing new password... Please wait..");
        setLoader(true);
        const email = document.getElementById('forgot-email').value;
        helper.axiosInstance.post(`/auth/reset-password`, { email }).then(res => {
            setLoader(false);
        }).catch(err => console.log(err));
    }

    return (
        <div className="w-full flex flex-col items-center justify-center h-full">
            <Head>
                <title>Sign in/Sign up</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full h-full flex flex-col items-center justify-center flex-1 bg-gray-100">
                {loader && <Loader text={loadingText} />}
                <div className="w-full px-4 pt-5 pb-1 mx-auto mt-8 mb-6 bg-white rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 sm:px-6">
                    {type && type == 'login' ? <div>
                        <h1 className="mb-4 text-lg font-semibold text-left text-primary">Please log in to your account</h1>
                        <form className="mb-8 space-y-6">
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Email</span>
                                <input className="form-input w-full px-3 py-2" type="email" id="login-email" placeholder="Ex. james@bond.com" inputMode="email" required />
                            </label>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Password</span>
                                <input className="form-input w-full px-3 py-2" type="password" id="login-password" placeholder="••••••••" required />
                            </label>
                            <input type="submit" onClick={(e) => onLogin(e)} className="w-full py-2 mt-1 text-secondary bg-primary-three hover:cursor-pointer hover:shadow-xl hover:text-white" value="Login" />
                        </form>
                    </div> : ''}

                    {type && type == 'signup' ? <div>
                        <h1 className="mb-4 text-lg font-semibold text-left text-primary">Create account</h1>
                        <form className="mb-8 space-y-2" onSubmit={handleSubmit(onSignIn)}>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">First Name</span>
                                <input className="form-input w-full px-3 py-2" type="text"
                                    {...register("firstName", { required: true })} id="signin-firstname" placeholder="James" />
                            </label>
                            <p className="mt-1 text-red-500 text-sm">{errors.firstName && "First name is required."}</p>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Last Name</span>
                                <input className="form-input w-full px-3 py-2" type="text"
                                    {...register("lastName", { required: true })} id="signin-lastname" placeholder="Carter" />
                            </label>
                            <p className="mt-1 text-red-500 text-sm">{errors.lastName && "Last name is required."}</p>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Email</span>
                                <input className="form-input w-full px-3 py-2" type="email"
                                    {...register("email", { required: true })} id="signin-email" placeholder="Ex. james@gmail.com" />
                            </label>
                            <p className="mt-1 text-red-500 text-sm">{errors.email && "Email is required."}</p>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Password</span>
                                <input className="form-input w-full px-3 py-2" type="password"
                                    {...register("password", { required: true })} id="signin-password" placeholder="••••••••" />
                            </label>
                            <p className="mt-1 text-red-500 text-sm">{errors.password && "Password is required."}</p>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Phone</span>
                                <input className="form-input w-full px-3 py-2" type="number"
                                    {...register("phone", { required: true })} id="signin-phone" placeholder="(+45) 455-34-3432" />
                            </label>
                            <p className="mt-1 text-red-500 text-sm">{errors.phone && "Phone number is required."}</p>
                            <input type="submit" className="w-full py-2 mt-1 text-secondary bg-primary-three hover:cursor-pointer hover:shadow-xl hover:text-white" value="Signin" />
                        </form>
                    </div> : ''}

                    {type && type == 'forgot' ? <div>
                        <h1 className="mb-2 text-lg font-semibold text-left text-primary">Forgot Password?</h1>
                        <h4 className="mb-4 text-sm text-left text-gray-700">Receive an authentication email by entering your email address.</h4>
                        <form className="mb-8 space-y-6">
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Email</span>
                                <input className="form-input w-full px-3 py-2" type="email" id="forgot-email" placeholder="Ex. james@bond.com" inputMode="email" required />
                            </label>
                            <input type="submit" onClick={(e) => onForgotPassword(e)} className="w-full py-2 mt-1 text-secondary bg-primary-three hover:cursor-pointer hover:shadow-xl hover:text-white" value="Change password" />
                        </form>
                    </div> : ''}

                </div>
                <p className="mb-4 text-xs text-center text-gray-400">
                    {type && type == 'login' ? <button className="text-primary underline hover:text-tertiary mr-2" onClick={() => setType('signup')}>Create an account</button> :
                        <button className="text-primary underline hover:text-tertiary mr-4" onClick={() => setType('login')}>Login</button>}
                    -
                    <button className="text-primary underline hover:text-tertiary ml-2" onClick={() => setType('forgot')}>Forgot password?</button>
                </p>
            </main>
        </div>
    )
}
