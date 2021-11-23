import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux';
import RentalDialogue from './rental-dialogue'

export const Product = ({ product }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    const cart = useSelector((state) => state.cart);

    return (

        <div key={product.id} className="col-span-6 md:col-span-3 group">
            <Link href={`/product/${product.id}`}>
                <div className="w-full relative text-left">
                    <div className="h-40 md:h-60 lg:h-72 xl:h-96 w-full relative overflow-hidden cursor-pointer">
                        <Image src={product.image} alt={product.title} layout='fill'
                            objectFit='contain' className="h-full !w-auto mx-auto group-hover:opacity-75" />
                    </div>
                    <div className="p-4">
                        <h3 className="text-md text-gray-900">
                            {product.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mt-4">
                            <span className="text-gray-700 mr-1">{product.currency}</span>
                            {product.discountedPrice ? product.discountedPrice : product.pricePerUnit}
                        </p>
                    </div>
                </div>
            </Link>
            <RentalDialogue product={product} openDialogue={false} removeBut={false} />
        </div>

    )
}