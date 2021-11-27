import React, { Fragment, useState } from 'react'
import { CalendarIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cart.slice';
import DatePicker from "react-datepicker";
import TimeKeeper from 'react-timekeeper';
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import axios from 'axios';
import { baseUrl } from "../config/config"
import Loader from '../components/loader'
import { toast } from 'react-toastify';

export default function RentalDialogue({ product, openDialogue, removeBut }) {
    const [cookie, setCookie] = useCookies(['user'])
    const [cartCookie, setCartCookie] = useCookies(['cart'])
    const router = useRouter()
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)

    const [open, setOpen] = useState(openDialogue)

    const [startDate, setStartDate] = useState(new Date());
    let tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const [endDate, setEndDate] = useState(tom);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const [startTime, setStartTime] = useState('9:00 am')
    const [showStartTime, setShowStartTime] = useState(false)
    const [endTime, setEndTime] = useState('9:00 pm')
    const [showEndTime, setShowEndTime] = useState(false)

    const addProductToCart = () => {
        setLoader(true);
        const fromDate = getFormattedDate(startDate, startTime)
        const toDate = getFormattedDate(endDate, endTime)
        const cart = {
            product: product.id,
            quantity: 1,
            cart: cartCookie.cart.id,
            fromDate,
            toDate
        }

        console.log(cart);
        axios.post(`${baseUrl}/carts/cart-item`, cart).then(async ({ data }) => {
            setLoader(false);
            console.log(data);
            dispatch(addToCart(data));
            toast.success("Added to cart!!!")
            setOpen(false)
        }).catch(e => onErr(e))
    }

    const removeProductFromCart = () => {
        const cartItem = cart.find(x => x.product == product.id);
        setLoader(true);
        axios.delete(`${baseUrl}/carts/cart-item/${cartItem}`).then(async ({ data }) => {
            console.log(data);
            dispatch(removeFromCart(cartItem));
            setLoader(false);
            toast.success("Removed from cart!")
        }).catch(e => onErr(e))
    }

    const onErr = (err) => {
        console.log(err);
        setLoader(false)
        toast.error("Some error occured, Try again!!!")
    }

    const getFormattedDate = (date, time) => {
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        const fDate = month + '/' + day + '/' + year;

        const timeAry = time.split(" ");
        let hr = Number((timeAry[0].split(":"))[0]);
        if (timeAry[1] == 'pm') {
            hr = hr + 12;
        }
        console.log(timeAry, hr)
        return fDate + "T" + ((hr.toString()).length == 2 ? hr.toString() : ("0" + hr.toString())) + ":00:00";
    }

    const isInCart = (id) => {
        return cart.findIndex(x => x.id == id) >= 0 ? true : false;
    }

    return (
        <>
            {loader && <Loader text="Adding to cart" />}
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
                                                    <div className="w-full grid grid-cols-12 gap-6">
                                                        <div className="col-span-12 text-center lg:col-span-7">
                                                            {showStartTime &&
                                                                <div className="col-span-12">
                                                                    <TimeKeeper
                                                                        time={startTime}
                                                                        onChange={(newTime) => setStartTime(newTime.formatted12)}
                                                                        onDoneClick={() => setShowStartTime(false)}
                                                                    />
                                                                </div>
                                                            }
                                                            {showEndTime &&
                                                                <TimeKeeper
                                                                    time={endTime}
                                                                    onChange={(newTime) => setEndTime(newTime.formatted12)}
                                                                    onDoneClick={() => setShowEndTime(false)}
                                                                />
                                                            }
                                                            {!showStartTime && !showEndTime &&
                                                                <>
                                                                    <label htmlFor="start-date"></label>
                                                                    <DatePicker
                                                                        selected={startDate}
                                                                        onChange={onChange}
                                                                        startDate={startDate}
                                                                        endDate={endDate}
                                                                        selectsRange
                                                                        inline
                                                                    />
                                                                </>
                                                            }
                                                        </div>
                                                        <div className="col-span-12 text-center lg:col-span-5 p-2">
                                                            <div className="my-2">
                                                                <h6>From: </h6>
                                                                <p className="text-md text-gray-900">
                                                                    <span className="text-sm text-gray-500">Date: </span>
                                                                    {startDate.toDateString()}
                                                                </p>
                                                                <p className="text-md text-gray-900">
                                                                    <span className="text-sm text-gray-500">Time: </span>
                                                                    {startTime} {!showStartTime &&
                                                                        <button className="text-sm text-primary-one hover:text-secondary-one ml-1" onClick={() => setShowStartTime(true)}>change</button>
                                                                    }</p>
                                                            </div>
                                                            {endDate && <div className="my-2">
                                                                <h6>To: </h6>
                                                                <p className="text-md text-gray-900">
                                                                    <span className="text-sm text-gray-500">Date: </span>
                                                                    {endDate.toDateString()}
                                                                </p>
                                                                <p className="text-md text-gray-900">
                                                                    <span className="text-sm text-gray-500">Time: </span>
                                                                    {endTime} {!showEndTime &&
                                                                        <button className="text-sm text-primary-one hover:text-secondary-one ml-1" onClick={() => setShowEndTime(true)}>change</button>
                                                                    }</p>
                                                            </div>}
                                                        </div>

                                                    </div>
                                                    <p className="text-xs text-tertiary mt-2"><span className="text-red-500 mr-1">Note: </span>
                                                        Please note that selected date and time should not be less than an hour.Billing will be charged based on the date and time which you select now.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="button" onClick={() => addProductToCart()}
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-one text-base font-medium text-white hover:bg-secondary-one hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm">
                                            Add to cart
                                        </button>
                                        <button type="button" onClick={() => setOpen(false)}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 bg-gray-50 shadow-sm px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </>}

                                {!cookie.user && <div className="w-full">
                                    <div className="py-32 px-3 flex items-center justify-center">
                                        Not logged in,
                                        <button onClick={() => router.push('/login')}
                                            className="mx-2 text-indigo-500 outline-none focus:outline-none hover:text-red-500" type="button">
                                            login / sign-up
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