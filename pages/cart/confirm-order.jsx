import { ArrowLeftIcon } from '@heroicons/react/solid'
import axios from 'axios';
import Link from 'next/link'
import { useRouter } from 'next/router'
import helper from "../../config/auth-helper"
import { useState, useEffect } from 'react';
import { formatter } from '../../config/config'
import { app_url, freeMiles, chargePerMile } from "../../config/config"
import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'
import Loader from '../../components/loader';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../redux/cart.slice';

export default function ConfirmOrder() {
    const router = useRouter();
    const [address, setAddress] = useState(null)
    const [distance, setDistance] = useState(0)
    const [charge, setCharge] = useState(0)
    const [cartLoading, setCartLoading] = useState(false)
    const [cartItems, setCartItems] = useState(null)
    const [loader, setloader] = useState(false)
    const [loaderText, setloaderText] = useState('')
    const dispatch = useDispatch();

    useEffect(async () => {
        const ad = router.query.address;
        if (!ad) {
            router.push('/cart/checkout')
        } else {
            setCartLoading(true);
            const addressObj = JSON.parse(ad);
            setAddress(addressObj);
            getDistance(addressObj);
            helper.axiosInstance.get(`/carts`).then(res => {
                setCartItems(res.data);
                setCartLoading(false);
            }).catch(err => { setCartLoading(false); console.log(err) })
        }
    }, [])

    const getDistance = async (addressObj) => {
        const origin = addressObj.addressLine1 + ', ' + addressObj.city + ', ' + addressObj.state + ' ' + addressObj.zipcode;
        const destination = '2 Maxwell Rd, Monroe Township, NJ 08831';
        const { data, status, statusText } = await axios.get(app_url + 'api/v1/map?origin=' + origin + '&destination=' + destination);
        if (status == 200) {
            const distance = Number((data.data.rows[0].elements[0].distance.text).split(' ')[0]);
            const charge = distance <= freeMiles ? 0 : (distance - freeMiles) * chargePerMile;
            setDistance(distance);
            setCharge(charge);
        }
    }

    const handlePlaceOrder = async (e) => {
        const encoded = CryptoJS.AES.encrypt(JSON.stringify(charge), cartItems.id).toString();
        console.log(encoded);
        const bytes = CryptoJS.AES.decrypt(encoded, cartItems.id);
        const decoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decoded);
        const body = {
            cartItems: cartItems.cartItems,
            address: {
                addressLine1: address.addressLine1,
                postal: address.zipcode,
                state: address.state,
                city: address.city
            },
            paymentMethod: "card",
            distance,
            deliveryCharge: charge
        }
        console.log(body);
        try {
            setloader(true);
            dispatch(fetchCart())
            setloaderText('Placing order...');
            const { data } = await helper.axiosInstance.post('/orders', body);
            router.push('/profile/orders')
        } catch (error) {
            setloader(false);
            console.log(error);
        }

    }

    return (
        <div className="flex flex-col py-8 px-2 lg:px-4">

            {loader && <Loader text={loaderText} />}

            <div className="px-2 mb-5 flex items-center">
                <Link href="/cart/checkout">
                    <ArrowLeftIcon className="h-6 w-6 mr-2 text-primary hover:text-secondary cursor-pointer" />
                </Link>
                <h1 className="text-md font-bold text-primary">Back to Checkout</h1>
            </div>

            <div className="grid grid-cols-12 gap-5">
                <div className="mt-5 md:mt-0 col-span-12 lg:col-span-6">
                    {address && <div className="p-5">
                        <h2 className='font-semibold'>Delivery Address:</h2>
                        {address.addressLine1 && <p className='my-2 ml-4 capitalize'>{address.addressLine1},</p>}
                        {address.landmark && <p className='my-2 ml-4 capitalize'>{address.landmark},</p>}
                        {address.city && <p className='my-2 ml-4 capitalize'>{address.city},</p>}
                        {address.state && <p className='my-2 ml-4 capitalize'>{address.state},</p>}
                        {address.country && <p className='my-2 ml-4 capitalize'>{address.country} - {address.zipcode}</p>}
                    </div>}
                </div>

                <div className="mt-5 h-min md:mt-0 col-span-12 lg:col-span-6 hidden lg:block shadow-xl rounded-xl border border-gray-100">
                    <div className="p-5 h-min">
                        <div className="w-full mb-5 flex items-center">
                            <p className="w-max">Cart total</p>
                            {cartItems && cartItems?.totalPrice && <p className="w-min ml-auto">{formatter.format(Number(cartItems.totalPrice))}</p>}
                        </div>
                        <div className="w-full mb-5 flex items-center">
                            <p className="w-max">Delivery Charge</p>
                            <p className="w-min ml-auto">{formatter.format(Number(charge))}</p>
                        </div>
                        <hr className='text-gray-200' />
                        <div className="w-full mt-3 mb-5 flex items-center">
                            <p className="w-max">Total</p>
                            {cartItems && cartItems?.totalPrice && <p className="w-min ml-auto">{formatter.format(Number(cartItems.totalPrice) + Number(charge))}</p>}
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <button className='w-full rounded-lg bg-primary-one text-white hover:shadow-xl hover:bg-secondary-one py-2' onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    </div>
                </div>

                {!cartLoading && cartItems && <ul role="list" className="mt-1 lg:mt-10 col-span-12 divide-y divide-gray-200">
                    {cartItems.cartItems.map((item) => (
                        <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                                {item.product.images.length > 0 && <img src={item.product.images[0].url} alt={item.product.title}
                                    className="w-full h-full object-center object-cover" />}
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                            <Link href={'/product/' + item.product.id}>
                                                <a className="capitalize hover:text-secondary-three">{item.product.title}</a>
                                            </Link>
                                        </h3>
                                        <p className="ml-4">
                                            {/* <span className="text-gray-700 mr-1">{item.product.currency}</span>{item.productTotal} */}
                                            {formatter.format(Number(item.productTotal))}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                    <p className="text-gray-500">Duration {item.duration}</p>
                                    <p className="text-sm text-gray-500">
                                        {/* <span className="text-gray-500 mr-1">{item.product.currency}</span> */}
                                        {formatter.format(Number(item.product.discountedPrice > 0 ? item.product.discountedPrice : item.product.pricePerUnit))}
                                        <span className="ml-0">{item.product.billingUnit == "HOURLY" ? '/hour' : '/day'}</span>
                                    </p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                    <p className="text-gray-500">Qty {item.quantity}</p>

                                    <div className="flex">
                                        <button type="button" className="font-medium text-red-400 hover:text-red-600" onClick={() => removeItem(item)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                    {cartItems && cartItems.cartItems.length == 0 && <div className="text-center">
                        <img src="/empty-box.png" alt="empty cart" className="w-full max-w-md mx-auto" />
                        No items added...
                    </div>}
                </ul>}
                {cartLoading && <div className='col-span-12'>
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

                <div className="mt-5 h-min md:mt-0 col-span-12 lg:col-span-6 lg:hidden block shadow-xl rounded-xl border border-gray-100">
                    <div className="p-5 h-min">
                        <div className="w-full mb-5 flex items-center">
                            <p className="w-max">Cart total</p>
                            {cartItems && cartItems?.totalPrice && <p className="w-min ml-auto">{formatter.format(Number(cartItems.totalPrice))}</p>}
                        </div>
                        <div className="w-full mb-5 flex items-center">
                            <p className="w-max">Delivery Charge ({distance} mi)</p>
                            <p className="w-min ml-auto">{formatter.format(Number(charge))}</p>
                        </div>
                        <div className="w-full mb-5 flex items-center">
                            <p className="w-max">Total</p>
                            {cartItems && cartItems?.totalPrice && <p className="w-min ml-auto">{formatter.format(Number(cartItems.totalPrice) + Number(charge))}</p>}
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <button className='w-full rounded-lg bg-primary-one text-white hover:shadow-xl hover:bg-secondary-one py-2' onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}


// const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyDWc6-894y_DJCewhixQE2FGVJNsft2_I8&units=imperial`;

// export async function getServerSideProps(ctx) {
//     const { req, res } = ctx
//     const { origin, destination } = req.query;

//     let response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=AIzaSyDWc6-894y_DJCewhixQE2FGVJNsft2_I8&units=imperial`);
//     let result = response.data;
//     console.log(result);
//     return {
//         props: {
//             result: result || null,
//         },
//     };
// }