import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCookies } from "react-cookie"
import helper from "../../config/auth-helper"
import Loader from '../../components/loader'
import { toast } from 'react-toastify';

export default function ManageProfile() {
    const [user, setUser] = useState(null)
    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const [loader, setLoader] = useState(false)
    const [loaderTxt, setLoaderTxt] = useState('')

    useEffect(() => {
        setLoaderTxt('Fetching your details...');
        setLoader(true);
        helper.axiosInstance.get('consumers/' + cookie.user.id)
            .then(res => { setUser(res.data); setLoader(false); })
            .catch(err => { console.log(err); setLoader(false); })
    }, [])

    const handleOnChange = (e) => {
        const { id, value } = e.target;
        const temp = user;
        temp[id] = value;
        setUser({ ...temp });
    }

    const update = () => {
        setLoaderTxt('Updating your details...');
        setLoader(true);
        helper.axiosInstance.update('consumers/' + cookie.user.id, user)
            .then(res => { setUser(res.data); setLoader(false); })
            .catch(err => { console.log(err); setLoader(false); })
    }

    return (
        <div className="flex flex-col py-8 px-2 lg:px-4">
            {loader && <Loader text={loaderTxt} />}
            <div className="px-2 mb-5 flex items-center">
                <Link href="/profile">
                    <ArrowLeftIcon className="h-6 w-6 mr-2 text-primary hover:text-secondary" />
                </Link>
                <h1 className="text-md font-bold text-primary">Manage Profile</h1>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-12 gap-6">

                            <div className="col-span-12 col-span-6">
                                <div className="my-3">
                                    <h4 className="text-lg">Personal details</h4>
                                </div>

                                {/* <div className="col-span-12 mb-4">
                                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                                    <div className="mt-1 flex items-center">
                                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </span>
                                        <button type="button"
                                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Change
                                        </button>
                                    </div>
                                </div> */}
                                <div className="col-span-12 my-3">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                        First Name
                                    </label>
                                    <input type="text" name="firstName" id="firstName" value={user?.firstName} onChange={handleOnChange}
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-12 md:col-span-6 my-3">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                        Last Name
                                    </label>
                                    <input type="text" name="lastName" id="lastName" value={user?.lastName} onChange={handleOnChange}
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div className="col-span-12 md:col-span-6 my-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input type="email" name="email" id="email" disabled value={user?.email} onChange={handleOnChange}
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md hover:cursor-not-allowed"
                                    />
                                    <small className='text-yellow-600 ml-2'>Email can't be edited.</small>
                                </div>

                                <div className="col-span-12 md:col-span-6 my-3">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone/Mobile
                                    </label>
                                    <input type="number" name="phone" id="phone" value={user?.phone} onChange={handleOnChange}
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {false && <div className="col-span-12 col-span-6">
                                <div className="my-3">
                                    <h4 className="text-lg">Address</h4>
                                </div>
                                <div className="col-span-12">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Address line 1
                                    </label>
                                    <input type="text" name="product-description" id="product-description"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Landmark
                                    </label>
                                    <input type="text" name="product-description" id="product-description"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input type="text" name="product-description" id="product-description"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        State
                                    </label>
                                    <input type="text" name="product-description" id="product-description"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <input type="text" name="product-description" id="product-description"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Zipcode
                                    </label>
                                    <input type="number" name="product-description" id="product-description"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>}

                        </div>
                    </div>
                    <div className="py-3 px-4">
                        <p className='text-sm text-gray-400'>Note: Details mentioned above are used only for identifying the users on order confirmation and internal purposes only. Will not be shared publicly.</p>
                    </div>
                    <div className="px-4 py-3 text-right sm:px-6">
                        <button type="submit" onClick={update}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:text-black bg-primary-three hover:bg-secondary focus:outline-none focus:ring-none"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </div>
    )
}