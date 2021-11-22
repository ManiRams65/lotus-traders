import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../redux/cart.slice';
import { ShoppingCartIcon } from '@heroicons/react/solid'

export const Product = ({ product }) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    });

    const cart = useSelector((state) => state.cart);

    const dispatch = useDispatch();

    const isExists = (item) => {
        return cart.find(x => x._id == item._id) !== undefined ? false : true;
    }

    return (
        <div key={product.id} className="col-span-6 md:col-span-3 group">
            <Link href={{
                pathname: '/product-page',
                query: { id: product.id ? product.id : null },
            }}>
                <>
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


                    <button onClick={() => dispatch(addToCart(product))}
                        className="w-max flex items-center py-2 px-3 bg-white text-white rounded group-hover:text-black hover:shadow-lg group-hover:bg-secondary">
                        <ShoppingCartIcon className="h-5 w-5 mr-2" />Add to cart
                    </button>
                </>
            </Link>
        </div>)
}