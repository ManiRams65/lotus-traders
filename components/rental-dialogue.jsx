import React, { Fragment, useState } from 'react'
import { CalendarIcon } from '@heroicons/react/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cart.slice';
import DatePicker from "react-datepicker";
import TimeKeeper from 'react-timekeeper';
import "react-datepicker/dist/react-datepicker.css";

export default function RentalDialogue({ product, openDialogue, removeBut }) {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(openDialogue)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const [startTime, setStartTime] = useState('9:00am')
    const [showStartTime, setShowStartTime] = useState(false)
    const [endTime, setEndTime] = useState('9:00pm')
    const [showEndTime, setShowEndTime] = useState(false)

    const addProductToCart = () => {
        let temp = product;
        temp.rentalDetails = {
            startDate: startDate.toString(),
            startTime,
            endDate: endDate.toString(),
            endTime
        };
        dispatch(addToCart(temp));
        setOpen(false)
    }

    const isInCart = (id) => {
        return cart.findIndex(x => x.id == id) >= 0 ? true : false;
    }

    return (
        <>
            {isInCart(product.id) && removeBut ? <button onClick={() => dispatch(removeFromCart(product))}
                className="my-8 w-max bg-red-100 rounded-md py-1 px-8 flex items-center text-base font-medium text-red-500 hover:bg-red-500 hover:text-white hover:shadow-xl hover:border-0 focus:outline-none focus:ring-0"
            >
                Remove from bag
            </button> : <button onClick={() => setOpen(true)}
                className="my-8 w-max bg-purple-900 rounded-md py-1 px-8 flex items-center text-base font-medium text-white hover:bg-primary hover:shadow-xl hover:border-0 focus:outline-none focus:ring-0"
            >
                Add to bag
            </button>}

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
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
                                <div className="bg-white px-4 pt-2 pb-4 sm:pt-4 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-1 lg:mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-md py-1 flex items-center leading-6 font-medium text-gray-900">
                                                <CalendarIcon className="h-5 w-5 text-purple-900 mr-2" aria-hidden="true" /> Select date and time
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <div className="w-full grid grid-cols-12 gap-6">
                                                    <div className="col-span-12 lg:col-span-7">
                                                        <label htmlFor="start-date"></label>
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={onChange}
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            selectsRange
                                                            inline
                                                        />
                                                    </div>
                                                    <div className="col-span-12 lg:col-span-5 p-2">
                                                        <div className="my-2">
                                                            {showStartTime &&
                                                                <TimeKeeper
                                                                    time={startTime}
                                                                    onChange={(newTime) => setStartTime(newTime.formatted12)}
                                                                    onDoneClick={() => setShowStartTime(false)}
                                                                    switchToMinuteOnHourSelect
                                                                />
                                                            }
                                                            <h6>From:</h6>
                                                            <p className="text-md text-gray-900">
                                                                <span className="text-sm text-gray-500">Date: </span>
                                                                {startDate.toDateString()}
                                                            </p>
                                                            <p className="text-md text-gray-900">
                                                                <span className="text-sm text-gray-500">Time: </span>
                                                                {startTime} {!showStartTime &&
                                                                    <button className="text-sm text-indigo-600 ml-1" onClick={() => setShowStartTime(true)}>change</button>
                                                                }</p>
                                                        </div>
                                                        {endDate && <div className="my-2">
                                                            {showEndTime &&
                                                                <TimeKeeper
                                                                    time={endTime}
                                                                    onChange={(newTime) => setEndTime(newTime.formatted12)}
                                                                    onDoneClick={() => setShowEndTime(false)}
                                                                    switchToMinuteOnHourSelect
                                                                />
                                                            }
                                                            <h6>To:</h6>
                                                            <p className="text-md text-gray-900">
                                                                <span className="text-sm text-gray-500">Date: </span>
                                                                {endDate.toDateString()}
                                                            </p>
                                                            <p className="text-md text-gray-900">
                                                                <span className="text-sm text-gray-500">Time: </span>
                                                                {endTime} {!showEndTime &&
                                                                    <button className="text-sm text-indigo-600 ml-1" onClick={() => setShowEndTime(true)}>change</button>
                                                                }</p>
                                                        </div>}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-2"><span className="text-red-500 mr-1">Note:</span>
                                                    Please note that selected date and time should not be less than an hour. Billing will be charged based on the date and time which you select now.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-900 text-base font-medium text-white hover:bg-primary hover:shadow-xl focus:shadow-lg focus:outline-none focus:ring-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => addProductToCart()}
                                    >
                                        Add to cart
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}