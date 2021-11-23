import Link from 'next/link'
import { ArrowLeftIcon, LogoutIcon } from '@heroicons/react/outline'

const orderMock = {
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
};

export default function OderPage({ order }) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    return (
        <main className="max-w-7xl mx-auto p-4 sm:p-1 lg:p-6">
            <div className="flex items-center px-3">
                <Link href="/profile/orders">
                    <a><ArrowLeftIcon className="h-6 w-6 mr-3 hover:text-secondary" /></a>
                </Link>
                <h3 className="text-lg font-bold text-primary capitalize">Your orders</h3>
            </div>

            <div className="grid grid-cols-12 mt-10 mb-2 p-4">
                <div className="col-span-12 text-gray-500">
                    <p className="py-1">
                        order id: &nbsp;  <a className="text-gray-900 hover:text-indigo-700">{order.id}</a>
                    </p>
                    <p className="py-1">
                        status: &nbsp; <span className="capitalize">
                            {order.status == 0 ? <span className="text-yellow-600">Pending</span> : order.status == 1 ? <span className="text-green-600">accepted</span> : <span className="text-red-600">rejected</span>}
                        </span>
                    </p>
                    <p className="py-1">
                        ordered on: &nbsp; <span className="text-gray-900">{(new Date(order.date)).toDateString()}</span>
                    </p>
                    <p className="pt-1 pb-2">
                        total amount: &nbsp; <span className="text-gray-900">{formatter.format(Number(order.amount))}</span>
                    </p>
                </div>
                <div className="col-span-12 mt-10">
                    <h5>Products:</h5>
                    {order.productList && order.productList.map((product, indx) => (
                        <div key={product.id + indx} className="flex items-center my-4">
                            <img src={product.img} alt={product.name} className="w-20 mr-4 rounded" />
                            <div>
                                <Link href={`/product/${product.id}`}>
                                    <a className="capitalize">{product.name}</a>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    console.log(id);
    // // request posts from api
    // let response = await fetch(`${baseUrl}/api/products?limit=4`);
    // // extract the data
    // let result = await response.json();

    return {
        props: {
            order: orderMock
        },
    };
}