import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeftIcon, LogoutIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import authHelper from '../../../config/auth-helper'
import { formatter } from '../../../config/config'

export default function Orders() {
    const [orders, setOrders] = useState([])
    const [ordersLoading, setOrdersLoading] = useState(false)

    useEffect(async () => {
        try {
            setOrdersLoading(true);
            const { data } = await authHelper.axiosInstance.get('/orders')
            console.log(data);
            setOrders(data);
            setOrdersLoading(false);
        } catch (error) {
            console.log(error);
            setOrdersLoading(false);
        }
    }, [])

    return (
        <div>
            <Head>
                <title className="capitalize">Your orders</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="google" content="notranslate" key="notranslate" />
            </Head>

            <main className="max-w-7xl mx-auto p-4 sm:p-1 lg:p-6">

                <div className="flex items-center px-3">
                    <Link href="/profile">
                        <a><ArrowLeftIcon className="h-6 w-6 mr-3 hover:text-secondary" /></a>
                    </Link>
                    <h3 className="text-lg font-bold text-primary capitalize">Profile</h3>
                </div>

                {!ordersLoading && <div className="relative p-6">
                    {orders.map((order, indx) => (
                        <div key={'order' + indx + '-' + order.id} className="grid grid-cols-12 mb-10 rounded-md  hover:shadow-xl border border-gray-100">
                            <div className="col-span-12 lg:col-span-6 text-gray-500 px-4 py-0 pt-4 lg:p-4">
                                <p className="py-1">
                                    order id: &nbsp;  <Link
                                        href={{
                                            pathname: `/profile/orders/${order.id}`,
                                            query: { id: order.id },
                                        }}
                                    >
                                        <a className="text-gray-900 hover:text-indigo-700 hover:cursor-pointer">{order.id}</a>
                                    </Link>
                                </p>
                                {/* <p className="pt-1 pb-2">
                                    Date: &nbsp; <span className="capitalize">
                                        {order.status == 0 ? <span className="text-yellow-600">Pending</span> : order.status == 1 ? <span className="text-green-600">accepted</span> : <span className="text-red-600">rejected</span>}
                                    </span>
                                </p> */}
                                <p className="pt-1 pb-2">
                                    Delivery Charge: &nbsp; <span className="text-gray-900">{formatter.format(Number(order.deliveryCharge))}</span>
                                </p>
                            </div>
                            <div className="col-span-12 lg:col-span-6 text-gray-500 px-4 py-0 lg:p-4">
                                <p className="py-1">
                                    Ordered on: &nbsp; <span className="text-gray-900">{order.created}</span>
                                </p>
                                <p className="pt-1 pb-2">
                                    total amount: &nbsp; <span className="text-gray-900">{formatter.format(Number(order.totalPrice))}</span>
                                </p>
                            </div>
                            <div className="col-span-12 my-4 text-center">
                                {order.cartItems && order.cartItems[0] ?
                                    <div className="flex items-center justify-center my-2">
                                        <img src={order.cartItems[0].product.images[0].url} alt={order.cartItems[0].product.title} className="w-20 mr-4 rounded shadow-sm border" />
                                        <div>
                                            <p className="capitalize">{order.cartItems[0].name}</p>
                                            {order.cartItems && order.cartItems.length > 1 ?
                                                <Link
                                                    href={{
                                                        pathname: `/profile/orders/${order.id}`,
                                                        query: { id: order.id },
                                                    }}>
                                                    <a className="text-indigo-400 hover:text-indigo-600 hover:cursor-pointer">
                                                        + {order.cartItems.length - 1} more.
                                                    </a></Link> : ''}
                                        </div>
                                    </div> : ''}
                            </div>
                        </div>
                    ))}
                </div>}

                {ordersLoading && <div className="relative p-6">
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

        </div>
    )
}

const Icon = (props) => {
    const { icon } = props
    const TheIcon = icon
    return <TheIcon {...props} />
}