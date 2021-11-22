import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

export default function ManageProduct({ isNew }) {
    return (
        <div className="flex flex-col py-8 px-2 lg:px-4">

            <div className="px-2 mb-5 flex items-center">
                <Link href="/admin/inventory">
                    <ArrowLeftIcon className="h-6 w-6 mr-2 text-primary hover:text-secondary" />
                </Link>
                <h1 className="text-md font-bold text-primary">{isNew ? 'Add Product' : 'Edit Product'}</h1>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                                <h1 className="text-primary">
                                    Product details
                                </h1>
                            </div>
                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input type="text" name="product-name" id="product-name"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input type="text" name="product-description" id="product-description"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select id="country" name="country" autoComplete="country-name"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Chairs</option>
                                    <option>Boards</option>
                                    <option>Flowers pots</option>
                                    <option>Hangings</option>
                                </select>
                            </div>

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Size
                                </label>
                                <select id="country" name="country" autoComplete="country-name"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                    <option>Extra Large</option>
                                </select>
                            </div>

                            <div className="col-span-12">
                                <label
                                    htmlFor="file-upload"
                                    className="relative py-2 px-4 cursor-pointer bg-indigo-100 rounded font-medium text-indigo-500 hover:bg-indigo-400 hover:text-white focus-within:outline-none focus-within:ring-none"
                                >
                                    <span>Upload images</span>
                                    <input id="file-upload" name="file-upload" type="file" accept="image/*" multiple className="sr-only" />
                                </label>
                            </div>

                            <div className="mt-10 col-span-12">
                                <h1 className="text-primary">
                                    Pricing details
                                </h1>
                            </div>

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
                                    Price (per unit)
                                </label>
                                <input type="text" name="product-price" id="product-price" autoComplete="email"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Billing unit
                                </label>
                                <select id="country" name="country" autoComplete="country-name"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Hour</option>
                                    <option>Day</option>
                                    <option>Week</option>
                                    <option>Month</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="px-4 py-3 text-right sm:px-6">
                        <button type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:text-black bg-primary hover:bg-secondary focus:outline-none focus:ring-none"
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

export async function getServerSideProps(ctx) {
    const { isNew, id } = ctx.query;

    return {
        props: {
            isNew: isNew
        },
    };
}