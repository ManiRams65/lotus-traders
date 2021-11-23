import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeftIcon, LogoutIcon } from '@heroicons/react/outline'

const orders = [
    {
        id: '1',
        date: '10-27-2021',
        amount: 20000,
        status: 1,
        productList: [
            {
                id: '1',
                name: 'Sweater for mens',
                img: 'https://img.icons8.com/color/48/000000/jumper.png',
            },
            {
                id: '2',
                name: 'Sweater for mens',
                img: 'https://img.icons8.com/color-glass/48/000000/jumper.png',
            }
        ]
    },
    {
        id: '2',
        date: '02-10-2021',
        amount: 10000,
        status: 0,
        productList: [
            {
                id: '1',
                name: 'Sweater for mens',
                img: 'https://img.icons8.com/color-glass/48/000000/jumper.png',
            }
        ]
    }
]

export default function About() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });
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
                    <h3 className="text-lg font-bold text-primary capitalize">Your orders</h3>
                </div>

                <div className="relative p-6">
                    {orders.map((order, indx) => (
                        <div className="grid grid-cols-12 border rounded mb-2">
                            <div className="col-span-12 lg:col-span-4 text-gray-500 p-4">
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
                                <p className="pt-1 pb-2">
                                    status: &nbsp; <span className="capitalize">
                                        {order.status == 0 ? <span className="text-yellow-600">Pending</span> : order.status == 1 ? <span className="text-green-600">accepted</span> : <span className="text-red-600">rejected</span>}
                                    </span>
                                </p>
                            </div>
                            <div className="col-span-12 lg:col-span-4 text-gray-500 p-4">
                                <p className="py-1">
                                    ordered on: &nbsp; <span className="text-gray-900">{(new Date(order.date)).toDateString()}</span>
                                </p>
                                <p className="pt-1 pb-2">
                                    total amount: &nbsp; <span className="text-gray-900">{formatter.format(Number(order.amount))}</span>
                                </p>
                            </div>
                            <div className="col-span-12 lg:col-span-4 text-center">
                                {order.productList && order.productList[0] ?
                                    <div className="flex items-center justify-center my-2">
                                        <img src={order.productList[0].img} alt={order.productList[0].name} className="w-20 mr-4 rounded shadow-sm border" />
                                        <div>
                                            <p className="capitalize">{order.productList[0].name}</p>
                                            {order.productList && order.productList.length > 1 ?
                                                <Link
                                                    href={{
                                                        pathname: `/profile/orders/${order.id}`,
                                                        query: { id: order.id },
                                                    }}>
                                                    <a className="text-indigo-400 hover:text-indigo-600 hover:cursor-pointer">
                                                        + {order.productList.length - 1} more.
                                                    </a></Link> : ''}
                                        </div>
                                    </div> : ''}
                            </div>
                        </div>
                    ))}
                </div>

            </main>

        </div>
    )
}

const Icon = (props) => {
    const { icon } = props
    const TheIcon = icon
    return <TheIcon {...props} />
}