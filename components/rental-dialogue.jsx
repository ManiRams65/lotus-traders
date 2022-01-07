import React, { Fragment, useState } from 'react'
import { CalendarIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cart.slice';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import helper from "../config/auth-helper"
import Loader from '../components/loader'
import { toast } from 'react-toastify';

const time = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

export default function RentalDialogue({ product, openDialogue, removeBut }) {
    const [cookie, setCookie] = useCookies(['user'])
    const [cartCookie, setCartCookie] = useCookies(['cart'])
    const router = useRouter()
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [loaderTxt, setLoaderTxt] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [fromTime, setFromTime] = useState('1')
    const [fromZone, setFromZone] = useState('AM')
    const [toDate, setToDate] = useState('')
    const [toTime, setToTime] = useState('1')
    const [toZone, setToZone] = useState('AM')
    const [singleDay, setSingleDay] = useState(product.billingUnit == 'HOURLY' ? 2 : 1)
    const [open, setOpen] = useState(openDialogue)

    const addProductToCart = async () => {
        if (!fromDate) {
            toast.error('Choose a date and time to proceed');
            return;
        }
        if (singleDay == 2 && !toDate) {
            // console.log(singleDay, toDate)
            toast.error('Choose a date and time to proceed');
            return;
        }
        const newTime = (new Date()).toTimeString().substring(0, 2);

        if ((fromZone == 'AM' ? Number(fromTime) : Number(fromTime) + 12) <= Number(newTime) && new Date().getDate() == Number(fromDate.split('-')[2])) {
            // console.log((fromZone == 'AM' ? fromTime : fromTime + 12), newTime)
            toast.error('Orders have been closed for the selected time');
            return;
        }
        if (fromDate == toDate && (toZone == 'AM' ? Number(toTime) : Number(toTime) + 12) <= Number(newTime)) {
            // console.log(fromDate, toDate, (toZone == 'AM' ? toTime : toTime + 12), newTime)
            toast.error('Choose different to Date/Time');
            return;
        }
        if (singleDay == 2 && (toDate.split('-')[2] == fromDate.split('-')[2])) {
            // console.log(singleDay, fromDate, toDate)
            if ((toZone == 'AM' ? Number(toTime) : Number(toTime) + 12) <= (fromTime == 'AM' ? Number(fromTime) : Number(fromTime) + 12)) {
                // console.log(toZone, toTime, fromTime)
                toast.error('A time gap of at least one hour is recommended...');
                return;
            }
        }

        const fromFullDate = getFormattedDate(new Date(fromDate ? fromDate : (new Date())), product.billingUnit == 'HOURLY' ? fromTime : '0', product.billingUnit == 'HOURLY' ? fromZone : 'AM')
        const toFullDate = singleDay != 2 ?
            getFormattedDate(new Date(fromDate ? fromDate : (new Date())), '12', 'PM')
            : getFormattedDate(new Date(toDate ? toDate : (new Date())), product.billingUnit == 'HOURLY' ? toTime : '0', product.billingUnit == 'HOURLY' ? toZone : 'AM')
        const cart = {
            product: product.id,
            quantity: 1,
            cart: cartCookie.cart.id,
            fromDate: fromFullDate,
            toDate: toFullDate
        }
        setLoaderTxt('Adding to cart');
        setLoader(true);
        helper.axiosInstance.post(`carts/cart-item`, cart).then(async ({ data }) => {
            setLoader(false);
            dispatch(addToCart(data));
            toast.success("Added to cart!!!")
            setOpen(false)
        }).catch(e => onErr(e))
    }

    const removeProductFromCart = () => {
        setLoaderTxt('Removing from cart');
        const cartItem = cart.find(x => x.product.id == product.id);

        if (cartItem) {
            setLoader(true);
            helper.axiosInstance.delete(`carts/cart-item/${cartItem.id}`).then(async ({ data }) => {
                dispatch(removeFromCart(cartItem));
                setLoader(false);
                toast.success("Removed from cart!!!")
            }).catch(e => onErr(e))
        }
    }

    const onErr = (err) => {
        console.log(err);
        setLoader(false)
    }

    const getFormattedDate = (date, time, zone) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        let hr = Number(time);
        if (zone == 'PM') {
            hr = hr + 12;
        }
        return month + '/' + day + '/' + year + "T" + ((hr.toString()).length == 2 ? hr.toString() : ("0" + hr.toString())) + ":00:00";
    }

    const isInCart = (id) => {
        return cart.findIndex(x => x.product.id == id) >= 0 ? true : false;
    }

    return (
        <>
            {loader && <Loader text={loaderTxt} />}
            {isInCart(product.id) && removeBut ? <button onClick={removeProductFromCart}
                className="my-8 w-max bg-red-100 rounded-md py-1 px-8 flex items-center text-base font-medium text-red-500 hover:bg-red-500 hover:text-white hover:shadow-xl hover:border-0 focus:outline-none focus:ring-0"
            >
                Remove from bag
            </button> : <button onClick={() => setOpen(true)}
                className="my-2 w-max bg-primary-one rounded-md py-1 px-8 flex items-center text-base font-medium text-white hover:bg-secondary-three hover:shadow-lg hover:border-0 focus:outline-none focus:ring-0"
            >
                Add to bag
            </button>}

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-30 inset-0 overflow-y-auto" onClose={setOpen}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all mt-28 lg:mt-8 sm:align-middle sm:max-w-lg sm:w-full">
                                {cookie.user && <>
                                    <div className="bg-white px-4 pt-2 pb-4 sm:pt-4 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-1 lg:mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-md py-1 flex items-center leading-6 font-medium text-gray-900">
                                                    <CalendarIcon className="h-5 w-5 text-primary-one mr-2" aria-hidden="true" /> Select date and time
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <div className="w-full grid grid-cols-12 gap-6 mb-4 lg:mb-6">
                                                        <div className="col-span-12 pt-4">
                                                            <div className="flex items-center">
                                                                <div className="mr-4">
                                                                    <label className="inline-flex items-center">
                                                                        <input type="radio" className="form-radio text-primary-one border-primary-one focus:outline-none focus:ring-0"
                                                                            name="radio" value="1" onChange={() => setSingleDay(1)} checked={singleDay == 1} />
                                                                        <span className="ml-2">Single day</span>
                                                                    </label>
                                                                </div>
                                                                <div>
                                                                    <label className="inline-flex items-center">
                                                                        <input type="radio" className="form-radio text-primary-one border-primary-one focus:outline-none focus:ring-0"
                                                                            name="radio" value="2" onChange={() => setSingleDay(2)} checked={singleDay == 2} />
                                                                        <span className="ml-2">Multiple days</span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 lg:col-span-6">
                                                            <div className="mb-4">
                                                                <label htmlFor="fromDate" className="text-secondary-three">From Date:</label>
                                                                <input type="date" name="fromDate" id="fromDate" min={new Date().toISOString().split('T')[0]} onChange={(e) => setFromDate(e.target.value)}
                                                                    className="w-full mt-2 rounded text-gray-400 focus:text-gray-600 outline-none focus:ring-0 focus:outline-none border-gray-400 focus:border-primary-one" />
                                                            </div>
                                                            {product.billingUnit == 'HOURLY' && <div>
                                                                <label htmlFor="fromTime" className="text-secondary-three">Time from:</label>
                                                                <div name="fromTime" id="fromTime" className="w-full flex items-center mt-2">
                                                                    <select onChange={(e) => setFromTime(e.target.value)}
                                                                        className="w-6/12 rounded text-gray-400 focus:text-gray-600 outline-none focus:ring-0 focus:outline-none border-gray-400 focus:border-primary-one">
                                                                        {time.map((d) => (
                                                                            <option key={d} value={d}>{d}</option>
                                                                        ))}
                                                                    </select>
                                                                    <select onChange={(e) => setFromZone(e.target.value)}
                                                                        className="w-5/12 ml-auto rounded text-gray-400 focus:text-gray-600 outline-none focus:ring-0 focus:outline-none border-gray-400 focus:border-primary-one">
                                                                        <option value="AM">AM</option>
                                                                        <option value="PM">PM</option>
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        </div>
                                                        {singleDay == 2 && <div className="col-span-12 lg:col-span-6">
                                                            <div className="mb-4">
                                                                <label htmlFor="toDate" className="text-secondary-three">To Date:</label>
                                                                <input type="date" name="toDate" id="toDate" min={new Date().toISOString().split('T')[0]} onChange={(e) => setToDate(e.target.value)}
                                                                    className="w-full mt-2 rounded text-gray-400 focus:text-gray-600 outline-none focus:ring-0 focus:outline-none border-gray-400 focus:border-primary-one" />
                                                            </div>
                                                            {product.billingUnit == 'HOURLY' && <div>
                                                                <label htmlFor="toTime" className="text-secondary-three">Ttime to:</label>
                                                                <div name="toTime" id="toTime" className="w-full flex items-center mt-2">
                                                                    <select onChange={(e) => setToTime(e.target.value)}
                                                                        className="w-6/12 rounded text-gray-400 focus:text-gray-600 outline-none focus:ring-0 focus:outline-none border-gray-400 focus:border-primary-one">
                                                                        {time.map((d) => (
                                                                            <option key={d} value={d}>{d}</option>
                                                                        ))}
                                                                    </select>
                                                                    <select onChange={(e) => setToZone(e.target.value)}
                                                                        className="w-5/12 ml-auto rounded text-gray-400 focus:text-gray-600 outline-none focus:ring-0 focus:outline-none border-gray-400 focus:border-primary-one">
                                                                        <option value="AM">AM</option>
                                                                        <option value="PM">PM</option>
                                                                    </select>
                                                                </div>
                                                            </div>}
                                                        </div>}

                                                    </div>
                                                    <p className="text-xs text-tertiary mt-2"><span className="text-red-500 mr-1">Note: </span>
                                                    We request that you select a date and time that is no less than an hour. Billing will be based on the date and time that you select now.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="button" onClick={() => addProductToCart()}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-one text-base font-medium text-white hover:bg-secondary-one hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm">
                                            Add to Bag
                                        </button>
                                        <button type="button" onClick={() => setOpen(false)}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </>}

                                {!cookie.user && <div className="w-full">
                                    <div className="py-32 px-3 flex items-center justify-center">
                                    You are not logged in,
                                        <button onClick={() => router.push('/login?returnUrl=' + router.pathname)}
                                            className="mx-2 text-indigo-500 outline-none focus:outline-none hover:text-red-500" type="button">
                                            Sign up / login
                                        </button> to continue
                                    </div>
                                </div>}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root >
        </>
    );
}