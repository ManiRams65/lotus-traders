import Head from 'next/head'

export default function Categories() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Lotus Traders</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex flex-col items-center justify-center w-full flex-1 px-2 lg:px-10 text-center">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                    <p className="mt-1">$16.00</p>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                    <p className="mt-1">$21.15</p>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/422x262" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                    <p className="mt-1">$12.00</p>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                    <p className="mt-1">$18.40</p>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/424x264" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                    <p className="mt-1">$16.00</p>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/425x265" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                    <p className="mt-1">$21.15</p>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/427x267" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                    <p className="mt-1">$12.00</p>
                                </div>
                            </div>
                            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <a className="block relative h-48 rounded overflow-hidden">
                                    <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/428x268" />
                                </a>
                                <div className="mt-4">
                                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                    <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                    <p className="mt-1">$18.40</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
