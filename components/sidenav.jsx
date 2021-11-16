import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router'
import { HomeIcon, ShoppingBagIcon, ShoppingCartIcon, InformationCircleIcon, PhoneIcon, UserIcon, LoginIcon } from '@heroicons/react/solid'

const menus = [
    { icon: HomeIcon, label: 'Home', href: '/' },
    { icon: ShoppingBagIcon, label: 'Categories', href: '/categories' },
    { icon: InformationCircleIcon, label: 'About Us', href: '/about' },
    { icon: PhoneIcon, label: 'Contact us', href: '/contact' },
    { icon: UserIcon, label: 'My Account', href: '/profile' },
    { icon: LoginIcon, label: 'Login', href: '/login' }
];

export const Sidenav = () => {
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            Router.push('/search-result?text=' + e.target.value);
        }
    }

    return (
        <div className="relative w-full bg-primary text-white z-20">
            <div className="w-full flex flex-col sm:flex-row sm:justify-around">
                <div className="w-full h-screen">
                    <ShoppingCartIcon className="h-6 w-6 z-30 absolute top-10 right-10 cursor-pointer" />
                    <span className="absolute top-7 right-6 z-20 px-2 py-1 w-6 h-6 text-xs rounded-full text-white bg-secondary">0</span>
                    <div className="flex items-center justify-start mx-6 mt-20">
                        {/* <img className="h-10" src="/icons/rocket.svg" /> */}
                        <span className="text-secondary ml-4 text-2xl font-bold">
                            Lotus Traders
                        </span>
                    </div>
                    <div className="my-3 px-4">
                        <input type="text" id="search-field" name="search-field" placeholder="Search" onKeyDown={handleSearch}
                            className="w-full bg-gray-100 rounded-xl border border-gray-300 focus:bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <nav className="mt-10 px-6 text-white">
                        {menus && menus.map((menu, index) => (
                            <Link key={menu.label + index} href={menu.href}>
                                <a className="flex items-center p-2 my-3 transition-colors duration-200 text-white rounded-lg hover:bg-gray-900">
                                    <menu.icon className="h-5 w-5" />
                                    <span className="mx-4 text-lg font-normal">
                                        {menu.label}
                                    </span>
                                    <span className="flex-grow text-right">
                                    </span>
                                </a>
                            </Link>
                        ))}
                    </nav>
                    <div className="absolute bottom-0 my-10 flex flex-row justify-center items-center w-full">
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105" target="_blank" rel="noreferrer">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                        </Link>
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105" target="_blank" rel="noreferrer">
                                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                            </a>
                        </Link>
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105" target="_blank" rel="noreferrer">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                                </svg>
                            </a>
                        </Link>
                        <Link href="#">
                            <a className="mr-4 duration-300 hover:transform hover:scale-105" target="_blank" rel="noreferrer">
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

    )
}