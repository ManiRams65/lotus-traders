import Link from 'next/link'
import Image from 'next/image'

export const Product = ({ product }) => {
    return (<div key={product.id} className="group relative">
        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
            <Link href={{
                pathname: '/product-page',
                query: { id: product.id ? product.id : null },
            }}>
                <img src={product.imageSrc} alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
            </Link>
        </div>
        <div className="mt-4 flex justify-between">
            <div>
                <h3 className="text-sm text-gray-700">
                    <Link href={{
                        pathname: '/product-page',
                        query: { id: product.id ? product.id : null },
                    }}>
                        <a>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </a>
                    </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
        </div>
    </div>)
}