import React, { Fragment, useState } from 'react'
import { PlusIcon, MinusIcon, CalendarIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, addToCart } from '../../redux/cart.slice';
import "react-datepicker/dist/react-datepicker.css";
import RentalDialogue from '../../components/rental-dialogue'
import { baseUrl } from '../../config/config'

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
    const dispatch = useDispatch();
    // const [activeImg, setActiveImg] = useState(prodObj)

    const [product, setProduct] = useState(prodObj)

    console.log(product)

    const isInCart = (id) => {
        return cart.findIndex(x => x.id == id) >= 0 ? true : false;
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
        return cart.find(x => x.id == id).quantity;
    }

    return (
        <div className="bg-white w-full">
            {product && <div className="w-full mt-6 grid grid-cols-12 gap-6">

                {product.images && <div className="col-span-12 lg:col-span-5 px-2 pt-5">
                    <img
                        src={product.images[0].url}
                        alt={product.title}
                        className="w-full h-full object-center object-cover"
                    />
                </div>}
                {!product.image && <div className="col-span-12 lg:col-span-5 px-2 pt-5">
                    <img
                        src="/img-placeholder.png"
                        alt={product.title}
                        className="w-full h-full object-center object-cover"
                    />
                </div>}
                <div className="col-span-12 lg:col-span-7 px-10 lg:px-2">
                    <h1 className="text-xl font-bold my-1 tracking-tight text-gray-900 lg:text-2xl">{product.title}</h1>
                    <p className="text-xl lg:text-2xl mt-5 my-2 text-primary">
                        <span className="text-gray-700 mr-1">{product.currency}</span>
                        {product.discountedPrice ?
                            <span>{product.discountedPrice}<span className="ml-3 text-gray-500 line-through text-lg">{product.currency}{product.pricePerUnit}</span></span> :
                            <span>{product.pricePerUnit}</span>}
                    </p>
                    <p className="text-md text-gray-500">
                        (billing per {product.billingUnit == 'HOURLY' ? 'hour' : 'day'})
                    </p>
                    {/* {isInCart(product.id) ? <div className="w-max my-8 flex items-center">
                        <MinusIcon onClick={() => dispatch(decrementQuantity(product))} className="w-6 h-6 p-1 bg-red-100 hover:bg-red-500 mr-4 hover:text-white text-red-500 hover:cursor-pointer" />
                        {getQuantity(product.id)}
                        <PlusIcon onClick={() => dispatch(incrementQuantity(product))} className="w-6 h-6 p-1 bg-green-100 hover:bg-green-500 ml-4 hover:text-white text-green-500 hover:cursor-pointer" />
                    </div> : <RentalDialogue product={product} openDialogue={false} removeBut={true} />} */}
                    <RentalDialogue product={product} openDialogue={false} removeBut={true} />

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

    console.log(result);

    return {
        props: {
            prodObj: result ? result : null,
            id: id ? id : ''
        },
    };
}