import React, { Fragment, useState } from 'react'
import { PlusIcon, MinusIcon, CalendarIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, replaceCartItem } from '../../redux/cart.slice';
import "react-datepicker/dist/react-datepicker.css";
import RentalDialogue from '../../components/rental-dialogue'
import { baseUrl } from '../../config/config'
import helper from '../../config/auth-helper'
import Loader from '../../components/loader'
import { toast } from 'react-toastify';
import { useCookies } from "react-cookie"

const productMock = {
    id: 1,
    title: 'Basic Tee 6-Pack',
    pricePerUnit: '192',
    discountedPrice: '150',
    billingUnit: 'HOURLY',
    currency: '$',
    image: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    metadata: '{ "length": "20 inches", "breadth": "10 inches" }',
}

export default function ProductPage({ prodObj, id }) {
    const cart = useSelector((state) => state.cart);
    const [loader, setLoader] = useState(false)
    const [loadText, setLoadText] = useState('Adding to cart')
    const [cookie, setCookie] = useCookies(['cart'])
    const dispatch = useDispatch();
    // const [activeImg, setActiveImg] = useState(prodObj)

    const [product, setProduct] = useState(prodObj)

    const isInCart = (id) => {
        return cart.findIndex(x => x.product.id == id) >= 0 ? true : false;
    }

    const getKeys = (data) => {
        if (data && data != '') {
            const metaData = data;
            return Object.keys(metaData);
        }
        return [];
    }

    const getValue = (data, key) => {
        const metaData = data;
        return metaData[key];
    }

    const getQuantity = (id) => {
        return cart.find(x => x.product.id == id).quantity;
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
            .then(res => onSuccess(res.data.cartItems[0], 'plus')).catch(e => onErr(e))
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
                .then(res => onSuccess(res.data.cartItems[0], 'plus')).catch(e => onErr(e))
        } else {
            helper.axiosInstance.delete(`carts/cart-item/${cartItem.id}`)
                .then(({ data }) => {
                    dispatch(removeFromCart(cartItem.id))
                    setLoader(false);
                }).catch(e => onErr(e));
        }
    }

    const onSuccess = (obj, flag) => {
        dispatch(replaceCartItem(obj))
        setLoader(false);
    }

    const onErr = (e) => {
        console.log(e);
        toast.error('Something went wrong')
        setLoader(false)
    }

    return (
        <div className="bg-white w-full">
            {loader && <Loader text={loadText} />}
            {product && <div className="w-full mt-6 grid grid-cols-12 gap-6">

                {product.images.length > 0 && <div className="col-span-12 lg:col-span-5 px-2 pt-5">
                    <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="w-full h-full object-center object-cover"
                    />
                </div>}
                {product.images.length == 0 && <div className="col-span-12 lg:col-span-5 px-2 pt-5">
                    <img
                        src="/img-placeholder.png"
                        alt={product.title}
                        className="w-full h-full object-center object-cover"
                    />
                </div>}
                <div className="col-span-12 lg:col-span-7 px-10 lg:px-2">
                    <h1 className="text-xl font-bold my-1 tracking-tight capitalize text-gray-900 lg:text-2xl">{product.title}</h1>
                    <p className="text-xl lg:text-2xl mt-5 my-2 text-primary">
                        <span className="text-gray-700 mr-1">{product.currency}</span>
                        {product.discountedPrice > 0 ?
                            <span>{product.discountedPrice}<span className="ml-3 text-gray-500 line-through text-lg">{product.currency}{product.pricePerUnit}</span></span> :
                            <span>{product.pricePerUnit}</span>}
                    </p>
                    <p className="text-md text-gray-500">
                        (billing per {product.billingUnit == 'HOURLY' ? 'hour' : 'day'})
                    </p>
                    {isInCart(product.id) ? <div className="w-max my-8 flex items-center">
                        <MinusIcon onClick={() => minusQuantity(product.id)} className="w-6 h-6 p-1 bg-red-100 hover:bg-red-500 mr-4 hover:text-white text-red-500 hover:cursor-pointer" />
                        {getQuantity(product.id)}
                        <PlusIcon onClick={() => plusQuantity(product.id)} className="w-6 h-6 p-1 bg-green-100 hover:bg-green-500 ml-4 hover:text-white text-green-500 hover:cursor-pointer" />
                    </div> : <RentalDialogue product={product} openDialogue={false} removeBut={false} />}
                    {/* <RentalDialogue product={product} openDialogue={false} removeBut={true} /> */}

                    {product.metadata && <>
                        <h2 className="mt-10">Product information:</h2>
                        <>{getKeys(product.metadata).length > 0 && getKeys(product.metadata).map((metadata, indx) => (
                            <p key={metadata + indx} className="text-gray-500 my-2 capitalize">{metadata}: <span className="text-gray-800">{getValue(product.metadata, metadata)}</span></p>
                        ))}</>
                    </>}

                    {product.description && <>
                        <p className="mt-8">Description:</p>
                        <p className="text-gray-500 my-2 mb-10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.description}</p>
                    </>}
                </div>
            </div>}

            {!product && <div className="w-full px-32 flex items-center justify-center">
                <img src="/404-page-not-found.svg" alt="page-not-found image" className="w-full" />
            </div>}
        </div>
    )
}


export async function getServerSideProps(ctx) {
    const { id } = ctx.params;
    let response = await fetch(`${baseUrl}/products/${id}`);
    // extract the data
    let result = await response.json();

    return {
        props: {
            prodObj: result ? result : null,
            id: id ? id : ''
        },
    };
}