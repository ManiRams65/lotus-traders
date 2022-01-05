import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function Checkout() {
    return (
        <div className="flex flex-col py-8 px-2 lg:px-4">

            <div className="px-2 mb-5 flex items-center">
                <Link href="/cart">
                    <ArrowLeftIcon className="h-6 w-6 mr-2 text-primary hover:text-secondary cursor-pointer" />
                </Link>
                <h1 className="text-md font-bold text-primary">Checkout</h1>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-12 gap-6">

                            <div className="col-span-12 col-span-6">
                                <div className="my-3">
                                    <h4 className="text-lg">Booking Address</h4>
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
                            </div>

                        </div>
                    </div>
                    <div className="px-4 py-3 text-left sm:px-6">
                        <button type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:text-black bg-primary-three hover:bg-secondary focus:outline-none focus:ring-none"
                        >
                            Order
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;

    return {
        props: {
            id: 22
        },
    };
}