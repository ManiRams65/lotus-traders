/* This example requires Tailwind CSS v2.0+ */
import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/cart.slice'

export default function Cart() {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);

    const getTotal = () => {
        let tot = 0;
        cart.map((prod) => {
            tot = tot + (Number(prod.discountedPrice ? prod.discountedPrice : prod.pricePerUnit) * Number(prod.quantity))
        });
        return tot;
    }

    const removeItem = (item) => {
        dispatch(removeFromCart(item))
    }

    return (
        <main className="w-full grid grid-cols-12 gap-4 py-3 lg:py-10">
            <div className="col-span-12 lg:col-span-8 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                </div>

                <div className="mt-8">
                    <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart && cart.map((product) => (
                                <li key={product.id} className="py-6 flex">
                                    <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                        <img src={product.image} alt={product.image}
                                            className="w-full h-full object-center object-cover" />
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link href={{
                                                        pathname: '/product-page',
                                                        query: { id: product.id ? product.id : null },
                                                    }}>
                                                        <a>{product.title}</a>
                                                    </Link>
                                                </h3>
                                                <p className="ml-4">
                                                    <span className="text-gray-700 mr-1">{product.currency}</span>
                                                    {product.discountedPrice ? product.discountedPrice : product.pricePerUnit}</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {product.quantity}</p>

                                            <div className="flex">
                                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => removeItem(product)}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            {cart && cart.length == 0 && <div className="text-center">
                                <img src="/empty-box.png" alt="empty cart" className="w-full max-w-md mx-auto" />
                                No items added...
                            </div>}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-span-12 flex items-center justify-center w-full h-max lg:col-span-4">
                <div className="lg:rounded lg:shadow-xl py-5 lg:px-4 lg:py-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${getTotal()}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Actual price may vary based on taxes calculated on purchase.</p>
                    <div className="mt-6">
                        {cart && cart.length > 0 ? <Link href="/cart/checkout">
                            <a className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Checkout
                            </a>
                        </Link> : <a className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-300"
                        >
                            Checkout
                        </a>}
                    </div>
                </div>
            </div>
        </main>
    )
}
