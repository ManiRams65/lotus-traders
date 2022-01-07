import Link from 'next/link'
import { ArrowLeftIcon, LogoutIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import authHelper from '../../../config/auth-helper'
import { formatter } from '../../../config/config'
import { useRouter } from 'next/router'
import { data } from 'autoprefixer'

export default function OderPage() {
    const [order, setOrder] = useState(null)
    const [orderLoading, setOrderLoading] = useState(false)
    const router = useRouter();

    useEffect(async () => {
        try {
            setOrderLoading(true);
            const id = router.query.id;
            const { data } = await authHelper.axiosInstance.get('/orders/' + id)
            console.log(data);
            setOrder(data);
            setOrderLoading(false);
        } catch (error) {
            console.log(error);
            setOrderLoading(false);
        }
    }, [])

    function getDate(date) {
        return new Date(date.split('T')[0]).toDateString()
    }

    return (
        <main className="max-w-7xl mx-auto p-4 sm:p-1 lg:p-6">
            <div className="flex items-center px-3 mt-3 lg:mt-0">
                <Link href="/profile/orders">
                    <a><ArrowLeftIcon className="h-6 w-6 mr-3 hover:text-secondary" /></a>
                </Link>
                <h3 className="text-lg font-bold text-primary capitalize">Your orders</h3>
            </div>

            {!orderLoading && order && <div className="grid grid-cols-12 mt-6 mb-2 p-4 border-0">
                <div className="col-span-12 text-gray-500">
                    <p className="py-1">
                        Order id: &nbsp;  <a className="text-gray-900 hover:text-primary-700">{order.id}</a>
                    </p>
                    {/* <p className="py-1">
                        status: &nbsp; <span className="capitalize">
                            {order.status == 0 ? <span className="text-yellow-600">Pending</span> : order.status == 1 ? <span className="text-green-600">accepted</span> : <span className="text-red-600">rejected</span>}
                        </span>
                    </p>*/}
                    <p className="py-1">
                        ordered on: &nbsp; <span className="text-gray-900">{getDate(order.created)}</span>
                    </p>
                    <p className="pt-1 pb-2">
                        Total price for products: &nbsp; <span className="text-gray-900">{formatter.format(Number(order.totalPrice))}</span>
                    </p>
                    <p className="pt-1 pb-2">
                        Delivery charge: &nbsp; <span className="text-gray-900">{formatter.format(Number(order.deliveryCharge))}</span>
                    </p>
                </div>
                <div className="col-span-12 mt-10">
                    <h5>Products:</h5>
                    {order.cartItems && order.cartItems.map((cartItem, indx) => (
                        <div key={'cartItem' + indx + '-' + cartItem.id} key={cartItem.product.id + indx} className="flex items-center my-4">
                            <img src={cartItem.product.images[0].url} alt={cartItem.product.title} className="w-20 mr-4 rounded" />
                            <div>
                                <Link href={`/product/${cartItem.product.id}`}>
                                    <a className="capitalize hover:text-primary-one">{cartItem.product.title}</a>
                                </Link>
                                <p className='text-gray-400'>From: <span className='text-gray-900 ml-2'>{getDate(cartItem.fromDate)}</span></p>
                                <p className='text-gray-400'>To: <span className='text-gray-900 ml-2'>{getDate(cartItem.toDate)}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>}

            {orderLoading && <div className="relative p-6">
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
        </main>
    )
}