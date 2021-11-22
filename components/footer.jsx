import Link from 'next/link'
// import Image from 'next/image'
// import { } from '@heroicons/react/solid'


export const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div className="container px-5 py-10 lg:py-16 mx-auto hidden lg:block">
                <div className="flex flex-wrap md:text-left text-center order-first">
                    <div className="lg:w-3/4 md:w-1/2 w-full px-4 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                        <div className="title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <Link href="/">
                                <a className="flex items-center w-max">
                                    <img src="/lotus-flower.png" className="w-10 h-10 p-1" alt="logo-alt" />
                                    <span className="ml-3 text-xl text-primary">Lotus Traders</span>
                                </a>
                            </Link>
                        </div>
                        <p className="mt-2 text-sm text-gray-500"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam fugiat ex accusamus recusandae doloremque aliquid natus, exercitationem animi facere voluptatum accusantium reiciendis provident dignissimos praesentium nulla saepe error vitae cum? </p>
                    </div>
                    <div className="lg:w-1/4 md:w-1/2 text-center lg:text-left w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-md mb-3 mt-5 lg:mt-0">Contact us:</h2>
                        <div className="flex flex-col mb-2 lg:flex-row">
                            <p className="mr-1 text-gray-700">Phone:</p>
                            <a href="tel:+91999999999" aria-label="Our phone" title="Our phone"
                                className="transition-colors duration-300 text-gray-900 hover:text-blue-500">
                                (+91) 999999999
                            </a>
                        </div>
                        <div className="flex flex-col mb-2 lg:flex-row">
                            <p className="mr-1 text-gray-700">Email:</p>
                            <a href="mailto:xyz@mail.com" aria-label="Our email" title="Our email"
                                className="transition-colors duration-300 text-gray-900 hover:text-blue-500">
                                xyz@mail.com
                            </a>
                        </div>
                        <div className="flex flex-col lg:flex-row">
                            <p className="mr-1 text-gray-700">Address:</p>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Our address"
                                title="Our address" className="transition-colors duration-300 text-gray-900 hover:text-blue-500">
                                Address line 1, city, state
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100">
                <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
                    <Link href="/">
                        <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                            <img src="/lotus-flower.png" className="w-10 h-10 p-1" alt="logo-alt" />
                            <span className="ml-3 text-xl">Lotus Traders</span>
                        </a>
                    </Link>
                    <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">Lotus Traders © 2021 —
                        <a href="https://bezzietech.com" rel="noopener noreferrer" className="text-gray-600 ml-1 hover:text-secondary" target="_blank">BezzieTech</a>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <a className="text-gray-500">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                <circle cx="4" cy="4" r="2" stroke="none"></circle>
                            </svg>
                        </a>
                    </span>
                </div>
            </div>
        </footer>
    )
}