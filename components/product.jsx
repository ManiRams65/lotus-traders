import Link from 'next/link'
import Image from 'next/image'

export const Product = ({ product }) => {
    return (<div key={product.id} className="col-span-6 md:col-span-3">
        <Link href={{
            pathname: '/product-page',
            query: { id: product.id ? product.id : null },
        }}>
            <div className="w-full relative text-left">
                <div className="h-40 md:h-60 lg:h-72 xl:h-96 w-full relative overflow-hidden cursor-pointer">
                    <Image src={product.imageSrc} alt={product.imageAlt} layout='fill'
                        objectFit='contain' className="h-full !w-auto mx-auto group-hover:opacity-75" />
                </div>
                <div className="p-4">
                    <h3 className="text-md text-gray-900">
                        {product.name}
                    </h3>
                    <p className="text-sm font-medium text-primary mt-4">{product.price}</p>
                </div>
            </div>

        </Link>


    </div>)
}