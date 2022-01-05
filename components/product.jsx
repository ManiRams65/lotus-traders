import Link from 'next/link'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux';
import RentalDialogue from './rental-dialogue'
import Loader from './loader'
import { PlusIcon, MinusIcon } from '@heroicons/react/solid'
import { removeFromCart, setCart } from '../redux/cart.slice';
import "react-datepicker/dist/react-datepicker.css";
import helper from '../config/auth-helper'
import { useCookies } from "react-cookie"
import { useState } from 'react';

export const Product = ({ product }) => {
    const [cookie, setCookie] = useCookies(['cart'])
    const cart = useSelector((state) => state.cart);
    const [loader, setLoader] = useState(false)
    const [loadText, setLoadText] = useState('Adding to cart')
    const dispatch = useDispatch();

    const getImgSrc = (prod) => {
        const imgObj = prod.images.length > 0 ? prod.images[0] : null
        return imgObj && imgObj.url ? (imgObj.url).toString() : null;
    }

    const isInCart = (id) => {
        return cart.findIndex(x => x.product.id == id) >= 0 ? true : false;
    }

    const plusQuantity = (id) => {
        setLoadText('Increasing cart quantity...')
        setLoader(true)
        const temp = cart.find(x => x.product.id == id);
        const cartItem = {
            cart: cookie.cart.id,
            id: temp.id,
            product: temp.product.id,
            quantity: temp.quantity + 1,
            fromDate: temp.fromDate,
            toDate: temp.toDate
        };
        helper.axiosInstance.put(`carts/cart-item/${cartItem.id}`, cartItem)
            .then(res => onSuccess(res.data.cartItems, 'plus')).catch(e => onErr(e))
    }

    const minusQuantity = (id) => {
        setLoadText('Decreasing cart quantity...')
        setLoader(true)
        const temp = cart.find(x => x.product.id == id);
        const cartItem = {
            cart: cookie.cart.id,
            id: temp.id,
            product: temp.product.id,
            quantity: temp.quantity,
            fromDate: temp.fromDate,
            toDate: temp.toDate
        };
        if (cartItem.quantity > 1) {
            cartItem.quantity = cartItem.quantity - 1;
            helper.axiosInstance.put(`carts/cart-item/${cartItem.id}`, cartItem)
                .then(res => onSuccess(res.data.cartItems, 'plus')).catch(e => onErr(e))
        } else {
            helper.axiosInstance.delete(`carts/cart-item/${cartItem.id}`)
                .then(({ data }) => {
                    dispatch(removeFromCart(cartItem.id))
                    setLoader(false);
                }).catch(e => onErr(e));
        }
    }

    const onSuccess = (cartItems, flag) => {
        dispatch(setCart(cartItems))
        setLoader(false);
    }

    const onErr = (e) => {
        console.log(e);
        // toast.error('Something went wrong')
        setLoader(false)
    }

    const getQuantity = (id) => {
        return cart.find(x => x.product.id == id).quantity;
    }

    return (

        <div key={product.id} className="col-span-6 md:col-span-3 group">
            {loader && <Loader text={loadText} />}
            <Link href={`/product/${product.id}`}>
                <div className="w-full relative text-left">
                    <div className="h-40 md:h-60 lg:h-72 xl:h-96 w-full relative overflow-hidden cursor-pointer">
                        {product.images.length > 0 ? <Image src={getImgSrc(product)} alt={product.title} layout='fill'
                            objectFit='contain' className="h-full !w-auto mx-auto group-hover:opacity-75" /> :
                            <Image src="/img-placeholder.png" alt={product.title} layout='fill'
                                objectFit='contain' className="h-full !w-auto mx-auto group-hover:opacity-75" />}
                    </div>
                    <div className="p-4">
                        <h3 className="text-md text-gray-900">
                            {product.title}
                        </h3>
                        <p className="text-sm font-medium text-primary mt-4">
                            <span className="text-gray-700 mr-1">{product.currency}</span>
                            {product.discountedPrice > 0 ? product.discountedPrice : product.pricePerUnit}
                        </p>
                    </div>
                </div>
            </Link>
            {isInCart(product.id) ? <div className="w-max my-8 flex items-center">
                <MinusIcon onClick={() => minusQuantity(product.id)} className="w-6 h-6 p-1 bg-red-100 hover:bg-red-500 mr-4 hover:text-white text-red-500 hover:cursor-pointer" />
                {getQuantity(product.id)}
                <PlusIcon onClick={() => plusQuantity(product.id)} className="w-6 h-6 p-1 bg-green-100 hover:bg-green-500 ml-4 hover:text-white text-green-500 hover:cursor-pointer" />
            </div> : <RentalDialogue product={product} openDialogue={false} removeBut={false} />}
            {/* <RentalDialogue product={product} openDialogue={false} removeBut={true} /> */}
        </div>

    )
}