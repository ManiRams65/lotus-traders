import Link from 'next/link'
import Router from 'next/router'
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon, InformationCircleIcon, PhoneIcon, UserIcon, LoginIcon, ViewGridIcon, TableIcon, MenuAlt3Icon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useSelector, useDispatch } from 'react-redux'

const menus = [
    { icon: HomeIcon, key: 'home-menu', label: 'Home', href: '/' },
    { icon: ShoppingBagIcon, key: 'cat-menu', label: 'Categories', href: '/categories' },
    { icon: InformationCircleIcon, key: 'about-menu', label: 'About Us', href: '/about' },
    { icon: PhoneIcon, key: 'contact-menu', label: 'Contact us', href: '/contact' },
    { icon: UserIcon, key: 'account-menu', label: 'My Account', href: '/profile' },
    // { icon: LoginIcon, key: 'login-menu', label: 'Login', href: '/login' }
];

const adminMenus = [
    { icon: ViewGridIcon, key: 'dashboard-menu', label: 'Dashboard', href: '/admin' },
    { icon: TableIcon, key: 'inventory-menu', label: 'Inventory', href: '/admin/inventory' },
    { icon: ShoppingBagIcon, key: 'orders-menu', label: 'Orders', href: '/admin/orders' },
    { icon: UserIcon, key: 'users-menu', label: 'Users', href: '/admin/users' }
];

export const Sidenav = () => {
    const [openMobMenu, setOpenMobMenu] = useState(false)

    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const handleSearch = (e, mob) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            if (mob) {
                setOpenMobMenu(false);
            }
            Router.push('/search-result?text=' + e.target.value);
        }
    }

    const getMenus = () => {
        if (Router && Router.router && Router.router.route && Router.router.route.includes('admin')) {
            return adminMenus && adminMenus.length > 0 ? adminMenus : [];
        }
        return menus && menus.length > 0 ? menus : [];
    }

    return (
        <div className="relative w-full bg-primary h-max text-white z-20">
            <div className="w-full flex flex-col sm:flex-row sm:justify-around">
                <div className="w-full h-screen hidden lg:block">
                    <Link href="/cart">
                        <a>
                            <ShoppingCartIcon className="h-6 w-6 z-30 absolute top-10 right-10 cursor-pointer" />
                            <span className="absolute top-7 right-6 z-20 px-2 py-1 w-6 h-6 text-xs rounded-full text-white bg-secondary">{cart.length}</span>
                        </a>
                    </Link>

                    <Link href="/">
                        <a className="flex items-center justify-start mx-6 mt-20">
                            <img src="/lotus-flower.png" className="w-10 h-10 p-1" alt="logo-alt" />
                            <span className="text-secondary ml-4 text-2xl font-bold">
                                Lotus Traders
                            </span>
                        </a>
                    </Link>

                    <div className="my-3 px-4">
                        <input type="text" id="search-field" name="search-field" placeholder="Search" onKeyDown={handleSearch}
                            className="w-full bg-gray-100 rounded-xl border border-gray-300 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <nav className="mt-10 px-6 text-white">
                        {getMenus().map((menu, index) => (
                            <Link key={menu.key} href={menu.href}>
                                <a className="flex items-center p-2 my-3 transition-colors duration-200 text-white rounded-lg hover:bg-gray-900">
                                    <menu.icon className="h-5 w-5" />
                                    <span className="mx-4 text-lg font-normal">
                                        {menu.label}
                                    </span>
                                    <span className="flex-grow text-right">
                                    </span>
                                </a>
                            </Link>
                        ))}</nav>

                    <div className="absolute bottom-0 my-10 flex flex-row justify-center items-center w-full">
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                        </Link>
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                        </Link>
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                        </Link>
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                </svg>
                            </a>
                        </Link>
                    </div>
                </div>

                <div className="w-full py-3 px-5 bg-primary z-10 fixed top-0 flex items-center lg:hidden">
                    <h1 className="text-secondary text-xl font-bold m-0">Lotus Traders</h1>
                    <div className="relative flex items-center justify-end ml-auto mr-6">
                        <Link href="/cart">
                            <a>
                                <span className="absolute -top-3 -right-3 z-10 px-2 py-1 w-6 h-6 text-xs rounded-full text-white bg-secondary">0</span>
                                <ShoppingCartIcon className="h-6 w-6 z-20 cursor-pointer text-white" />
                            </a>
                        </Link>

                    </div>
                    <MenuAlt3Icon className="h-6 w-6 mr-0 text-white" onClick={() => setOpenMobMenu(true)} />
                </div>

                <Transition.Root show={openMobMenu} as={Fragment}>
                    <Dialog as="div" className="fixed z-30 inset-0 overflow-hidden" onClose={setOpenMobMenu}>
                        <div className="absolute z-30 inset-0 overflow-hidden">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="absolute z-0 inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <div className="w-screen max-w-sm">
                                        <div className="h-full flex flex-col bg-primary shadow-xl overflow-y-scroll">
                                            <div className="flex-1 py-4 overflow-y-auto px-4 sm:px-6">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-secondary text-xl font-bold">Lotus Traders</Dialog.Title>
                                                    <div className="ml-3 h-7 flex items-center">
                                                        <button
                                                            type="button"
                                                            className="-m-2 p-2 text-white"
                                                            onClick={() => setOpenMobMenu(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="w-full h-max">
                                                    {/* <div className="flex items-center justify-start mx-6 mt-20">
                                                        <img className="h-10" src="/icons/rocket.svg" /> 

                                                    </div>*/}
                                                    <div className="mt-10 px-4">
                                                        <input type="text" id="search-field" name="search-field" placeholder="Search" onKeyDown={($event) => handleSearch($event, true)}
                                                            className="w-full bg-gray-100 rounded-xl border border-gray-300 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                                    </div>

                                                    <nav className="mt-8 px-6 text-white">
                                                        {getMenus().map((menu, index) => (
                                                            <Link key={menu.key} href={menu.href}>
                                                                <a onClick={() => setOpenMobMenu(false)} className="flex items-center p-2 my-3 transition-colors duration-200 text-white rounded-lg hover:bg-gray-900">
                                                                    <menu.icon className="h-5 w-5" />
                                                                    <span className="mx-4 text-lg font-normal">
                                                                        {menu.label}
                                                                    </span>
                                                                    <span className="flex-grow text-right">
                                                                    </span>
                                                                </a>
                                                            </Link>
                                                        ))}</nav>

                                                    <div className="absolute text-white bottom-0 my-10 flex flex-row justify-center items-center w-full">
                                                        <Link href="#">
                                                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                                </svg>
                                                            </a>
                                                        </Link>
                                                        <Link href="#">
                                                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                                </svg>
                                                            </a>
                                                        </Link>
                                                        <Link href="#">
                                                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                                                </svg>
                                                            </a>
                                                        </Link>
                                                        <Link href="#">
                                                            <a className="mr-4 duration-300 hover:transform hover:scale-105 hover:text-secondary" target="_blank" rel="noreferrer">
                                                                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                                                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                                                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                                                                </svg>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>
            </div>
        </div>

    )
}