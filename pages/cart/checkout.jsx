import { ArrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Checkout() {
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { 0: ad, 1: landmark, 2: city, 3: state, 4: country, 5: zipcode } = e.target;
        if (zipcode.value.toString().length < 4 || zipcode.value.toString().length > 6) {
            toast.error('Enter a valid zipcode');
            return;
        }
        const address = JSON.stringify({
            addressLine1: ad.value,
            landmark: landmark.value,
            city: city.value,
            state: state.value,
            country: country.value,
            zipcode: zipcode.value
        });
        router.push({
            pathname: '/cart/confirm-order',
            query: { address }
        });
    }

    return (
        <div className="flex flex-col py-8 px-2 lg:px-4">

            <div className="px-2 mb-5 flex items-center">
                <Link href="/cart">
                    <ArrowLeftIcon className="h-6 w-6 mr-2 text-primary hover:text-secondary cursor-pointer" />
                </Link>
                <h1 className="text-md font-bold text-primary">Back to Cart</h1>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit}>
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-12 gap-6">

                            <div className="col-span-12 lg:col-span-6">
                                <div className="my-3">
                                    <h4 className="text-lg">Booking Address</h4>
                                </div>
                                <div className="col-span-12">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Address line 1
                                    </label>
                                    <input type="text" name="product-description" id="product-description" required
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
                                    <input type="text" name="product-description" id="product-description" required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        State
                                    </label>
                                    <input type="text" name="product-description" id="product-description" required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>
                                    <input type="text" name="product-description" id="product-description" required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3">
                                    <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                        Zipcode
                                    </label>
                                    <input type="number" name="product-description" id="product-description" minLength="4" maxLength="6" required
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <div className="col-span-12 my-3 text-primary-one"><small>
                                    Please provide a exact address and pincode where order needs to be delivered.
                                </small></div>
                            </div>

                        </div>
                    </div>
                    <div className="px-4 py-3 text-left sm:px-6">
                        <button type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:text-black bg-primary-three hover:bg-secondary focus:outline-none focus:ring-none"
                        >
                            Verify Address
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}