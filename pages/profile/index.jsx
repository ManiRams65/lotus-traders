import Head from 'next/head'
import Link from 'next/link'
import { ShoppingBagIcon, PencilIcon } from '@heroicons/react/solid'
import helper from "../../config/auth-helper"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import { useSelector, useDispatch } from 'react-redux';
import { resetCart } from '../../redux/cart.slice'
import Loader from '../../components/loader';

export default function Profile() {
    const router = useRouter()
    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const dispatch = useDispatch();
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        setLoader(true);
        helper.axiosInstance.get('consumers/principal')
            .then(res => { setUser(res.data); setLoader(false); })
            .catch(err => { console.log(err); setLoader(false); })
    }, [])

    const signOut = (e) => {
        router.push('/logout');
    }

    return (
        <div className="w-full">
            <Head>
                <title>My Account</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full flex items-center justify-center bg-gray-200">
                {loader && <Loader text="Fetching your details" />}
                <div className="absolute top-0 w-full lg:w-4/5 h-60 z-10 bg-center bg-cover" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')"
                }}>
                    <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <section className="relative w-full z-20 py-16 px-4">
                    <div className="bg-white w-full mb-6 shadow-xl rounded-lg mt-20 lg:mt-40">
                        {cookie.user && <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                {/* <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg" className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px" />
                                    </div>
                                </div> */}
                                <button onClick={signOut}
                                    className="bg-red-500 mt-10 ml-auto mr-10 active:bg-red-600 uppercase text-white font-bold hover:shadow-xl text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                    Sign out
                                </button>
                                {/* <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        <button onClick={signOut}
                                            className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-xl text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                            Sign out
                                        </button>
                                    </div>
                                </div> */}
                                {/* <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Orders</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                        </div> 
                                    </div>
                                </div>*/}
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                                    {cookie.user.firstName} &nbsp; {cookie.user.lastName}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                    {cookie.user.email}
                                </div>
                                {/* <div className="mb-2 text-blueGray-600 mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Address
                                </div>user */}
                                {user?.phone && <div className="mb-2 text-blueGray-600">
                                    <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>{user?.phone}
                                </div>}
                            </div>
                            <div className="mt-10 py-10 text-center">
                                <div className="flex flex-col md:flex-row items-center justify-center">
                                    <Link href="/profile/orders">
                                        <div className="mx-3 flex items-center bg-secondary-three px-5 py-3 rounded-lg hover:cursor-pointer hover:shadow-xl">
                                            <ShoppingBagIcon className="h-6 w-6 mr-4 text-white" />
                                            <span className="text-white">Orders</span>
                                        </div>
                                    </Link>
                                    <Link href='/profile/manage-profile'>
                                        <div className="mx-3 flex items-center bg-secondary-three px-5 py-3 rounded-lg hover:cursor-pointer hover:shadow-xl">
                                            <PencilIcon className="h-6 w-6 mr-4 text-white" />
                                            <span className="text-white">Manage Profile</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>}
                        {!cookie.user && <div className="px-6">
                            <div className="w-full">
                                <div className="py-32 px-3 flex items-center justify-center">
                                    Not logged in
                                    <button onClick={() => router.push('/login?returnUrl=' + router.pathname)}
                                        className="ml-2 text-indigo-500 outline-none focus:outline-none hover:text-red-500" type="button">
                                        login / sign-up
                                    </button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </section>
            </main>
        </div>
    )
}


export async function getServerSideProps(ctx) {
    const { req, res } = ctx
    const cookie = helper.parseCookies(req)

    if (!cookie || !cookie['token']) {
        return {
            redirect: {
                destination: '/login?returnUrl=/profile',
                permanent: false,
            },
        }
    }

    return {
        props: {}
    };
}