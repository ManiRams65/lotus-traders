import Head from 'next/head'
import { useState } from 'react'

export default function Login() {
    const [type, setType] = useState('login');
    return (
        <div className="w-full flex flex-col items-center justify-center h-full">
            <Head>
                <title>Lotus Traders</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full h-full flex flex-col items-center justify-center flex-1 bg-gray-100">
                <div className="w-full px-4 pt-5 pb-1 mx-auto mt-8 mb-6 bg-white rounded-none shadow-xl sm:rounded-lg sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-5/12 sm:px-6">
                    {type && type == 'login' ? <div>
                        <h1 className="mb-4 text-lg font-semibold text-left text-primary">Log in to your account</h1>
                        <form className="mb-8 space-y-6">
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Email</span>
                                <input className="form-input w-full px-3 py-2" type="email" placeholder="Ex. james@bond.com" inputmode="email" required />
                            </label>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Password</span>
                                <input className="form-input w-full px-3 py-2" type="password" placeholder="••••••••" required />
                            </label>
                            <input type="submit" className="w-full py-2 mt-1 text-secondary bg-primary" value="Login" />
                        </form>
                    </div> : ''}

                    {type && type == 'signup' ? <div>
                        <h1 className="mb-4 text-lg font-semibold text-left text-primary">Create account</h1>
                        <form className="mb-8 space-y-6">
                        <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Name</span>
                                <input className="form-input w-full px-3 py-2" type="text" placeholder="James" inputmode="text" required />
                            </label>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Email</span>
                                <input className="form-input w-full px-3 py-2" type="email" placeholder="Ex. james@bond.com" inputmode="email" required />
                            </label>
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Password</span>
                                <input className="form-input w-full px-3 py-2" type="password" placeholder="••••••••" required />
                            </label>
                            <input type="submit" className="w-full py-2 mt-1 text-secondary bg-primary" value="Signin" />
                        </form>
                    </div> : ''}

                    {type && type == 'forgot' ? <div>
                        <h1 className="mb-2 text-lg font-semibold text-left text-primary">Forgot Password?</h1>
                        <h4 className="mb-4 text-sm text-left text-gray-700">Enter the email address to receive an authentication mail.</h4>
                        <form className="mb-8 space-y-6">
                            <label className="block">
                                <span className="block mb-2 text-sm font-medium text-gray-700">Your Email</span>
                                <input className="form-input w-full px-3 py-2" type="email" placeholder="Ex. james@bond.com" inputmode="email" required />
                            </label>
                            <input type="submit" className="w-full py-2 mt-1 text-secondary bg-primary" value="Change password" />
                        </form>
                    </div> : ''}

                </div>
                <p className="mb-4 text-xs text-center text-gray-400">
                    {type && type == 'login' ? <button className="text-primary underline hover:text-tertiary mr-4" onClick={() => setType('signup')}>Create an account</button> :
                        <button className="text-primary underline hover:text-tertiary mr-4" onClick={() => setType('login')}>Login</button>}

                    ·
                    <button className="text-primary underline hover:text-tertiary mr-4" onClick={() => setType('forgot')}>Forgot password?</button>
                </p>
            </main>
        </div>
    )
}
