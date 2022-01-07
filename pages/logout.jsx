import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useCookies } from "react-cookie"
import { resetCart } from '../redux/cart.slice'
import { useSelector, useDispatch } from 'react-redux';

export default function Logout() {
    const [userCookie, setUserCookie, removeUserCookie] = useCookies(['user'])
    const [tokenCookie, setTokenCookie, removeTokenCookie] = useCookies(['token'])
    const [cartCookie, setCartCookie, removeCartCookie] = useCookies(['cart'])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetCart([]));
        removeUserCookie('user');
        removeTokenCookie('token');
        localStorage.removeItem('token');
        removeCartCookie('cart');
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Logout</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-2 lg:px-10">
                <p className='mb-10'>Signed out redirecting to homepage in </p>
                <CountdownCircleTimer
                    isPlaying
                    duration={3}
                    colors={[
                        ['#004777', 0.33],
                        ['#F7B801', 0.33],
                        ['#A30000', 0.33],
                    ]}
                >
                    {({ remainingTime }) => {
                        if (remainingTime == 0) {
                            Router.push('/')
                        }
                        return remainingTime
                    }}
                </CountdownCircleTimer>
            </main>
        </div>
    )
}
