/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCart } from '../../redux/cart.slice'
import helper from "../../config/auth-helper"
import { formatter } from '../../config/config'
import { toast } from 'react-toastify'

export default function Cart() {
    const [cartItems, setCartItems] = useState(null)
    const [cartLoading, setCartLoading] = useState(false)
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartLoading(true);
        helper.axiosInstance.get(`/carts`).then(res => {
            setCartItems(res.data);
            setCartLoading(false);
        }).catch(err => { setCartLoading(false); console.log(err) })
    }, [])

    const removeItem = (item) => {
        helper.axiosInstance.delete(`carts/cart-item/${item.id}`)
            .then(({ data }) => {
                setCartItems({ ...data });
                dispatch(setCart(data.cartItems));
                toast.success('Removed from cart')
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <main className="w-full grid grid-cols-12 gap-4 py-3 lg:py-10">
            <div className="col-span-12 lg:col-span-8 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                </div>

                <div className="mt-8">
                    <div className="flow-root">
                        {!cartLoading && cartItems && <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.cartItems.map((item) => (
                                <li key={item.id} className="py-6 flex">
                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                        {item.product.images.length > 0 && <img src={item.product.images[0].url} alt={item.product.title}
                                            className="w-full h-full object-center object-cover" />}
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link href={'/product/' + item.product.id}>
                                                        <a className="capitalize hover:text-secondary-three">{item.product.title}</a>
                                                    </Link>
                                                </h3>
                                                <p className="ml-4">
                                                    {/* <span className="text-gray-700 mr-1">{item.product.currency}</span>{item.productTotal} */}
                                                    {formatter.format(Number(item.productTotal))}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-end justify-between text-sm">
                                            <p className="text-gray-500">Duration {item.duration}</p>
                                            <p className="text-sm text-gray-500">
                                                {/* <span className="text-gray-500 mr-1">{item.product.currency}</span> */}
                                                {formatter.format(Number(item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.pricePerUnit))}
                                                <span className="ml-0">{item.product.billingUnit == "HOURLY" ? '/hour' : '/day'}</span>
                                            </p>
                                        </div>
                                        <div className="flex-1 flex items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {item.quantity}</p>

                                            <div className="flex">
                                                <button type="button" className="font-medium text-red-400 hover:text-red-600" onClick={() => removeItem(item)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {cartItems && cartItems.cartItems.length == 0 && <div className="text-center">
                                <img src="/empty-box.png" alt="empty cart" className="w-full max-w-md mx-auto" />
                                No items added...
                            </div>}
                        </ul>}
                        {cartLoading && <div>
                            <div className="border-b border-gray-300 p-4 max-w-lg w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-gray-700 rounded"></div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                                                <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 border-b border-gray-300 p-4 max-w-lg w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-gray-700 rounded"></div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                                                <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 border-b border-gray-300 p-4 max-w-lg w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="rounded-full bg-gray-700 h-10 w-10"></div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-2 bg-gray-700 rounded"></div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="h-2 bg-gray-700 rounded col-span-2"></div>
                                                <div className="h-2 bg-gray-700 rounded col-span-1"></div>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>

            <div className="col-span-12 flex items-center justify-center w-full h-max lg:col-span-4">
                <div className="lg:rounded lg:shadow-xl py-5 lg:px-4 lg:py-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total</p>
                        {cartItems && cartItems?.totalPrice && <p>{formatter.format(Number(cartItems.totalPrice))}</p>}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Actual price may vary based on taxes calculated on purchase.</p>
                    <div className="mt-6">
                        {cart && cart.length > 0 ? <Link href="/cart/checkout">
                            <a className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-secondary-one hover:bg-secondary-three"
                            >
                                Checkout
                            </a>
                        </Link> : <a className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-gray-300"
                        >
                            Checkout
                        </a>}
                    </div>
                </div>
            </div>
        </main>
    )
}

// export async function getServerSideProps(ctx) {
//     const { req, res } = ctx
//     const cookie = helper.parseCookies(req)

//     if (!cookie || !cookie['token']) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             },
//         }
//     }

//     const config = {
//         headers: { Authorization: `Bearer ${cookie['token']}` }
//     }
//     let response = await axios.get(`${baseUrl}/carts`, config);
//     let result = response.data;
//     return {
//         props: {
//             cartItemsObj: result,
//         },
//     };
// }