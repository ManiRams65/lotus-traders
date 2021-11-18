import Head from 'next/head'
import Image from 'next/image'
import { Product } from '../components/product';
import { productsMock } from '../mock/data';

export default function Home({ featured }) {

  return (
    <div className="w-full">
      <Head>
        <title>Lotus Traders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-2 lg:px-10 text-center">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-tertiary hidden md:flex">
                <svg className="text-teal-900 w-7 h-7" viewBox="0 0 24 24">
                  <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeMiterlimit="10" points=" 8,5 8,1 16,1 16,5" strokeLinejoin="round" />
                  <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeMiterlimit="10" points="9,15 1,15 1,5 23,5 23,15 15,15" strokeLinejoin="round" />
                  <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeMiterlimit="10" points="22,18 22,23 2,23 2,18" strokeLinejoin="round" />
                  <rect x="9" y="13" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeMiterlimit="10" width="6" height="4" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="max-w-xl mb-6">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                  Let us handle
                  <br className="hidden md:block" />
                  your next{' '}
                  <span className="inline-block text-deep-purple-accent-400">
                    destination
                  </span>
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                  quae. explicabo.
                </p>
              </div>
              <div>
                <a href="/" aria-label=""
                  className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">
                  Learn more
                  <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12" >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center -mx-4 lg:pl-8">
              <div className="flex flex-col items-end px-3">
                <img
                  className="object-cover mb-6 rounded shadow-lg h-28 sm:h-48 xl:h-56 w-28 sm:w-48 xl:w-56"
                  src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt=""
                />
                <img
                  className="object-cover w-20 h-20 rounded shadow-lg sm:h-32 xl:h-40 sm:w-32 xl:w-40"
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                  alt=""
                />
              </div>
              <div className="px-3">
                <img
                  className="object-cover w-40 h-40 rounded shadow-lg sm:h-64 xl:h-80 sm:w-64 xl:w-80"
                  src="https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className="container px-4 py-4">
          <div className="items-center lg:flex">
            <div className="w-full h-96 text-center relative lg:w-3/6">
              <Image src="/rental.png" alt="choosing clothes" layout='fill'
                objectFit='contain' className="object-center object-cover" />
            </div>

            <div className="w-full lg:w-3/6">
              <div className="lg:max-w-lg">
                <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">Best place to rent <span className="text-tertiary">Products</span></h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident ullam animi reiciendis iure similique amet dolor a aliquid ex illum, id repellat culpa saepe obcaecati et consectetur odit eos vitae.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-4 px-1 md:px-6 w-full">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Featured products</h2>
          <div className="mt-6 grid grid-cols-12 gap-6">
            {featured && featured.map((product) => (
              <Product key={'featured' + product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="bg-white py-4 px-1 md:px-6 w-full">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Top rented products</h2>
          <div className="mt-6 grid grid-cols-12 gap-6">
            {featured && featured.map((product) => (
              <Product key={'top rented' + product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="py-4 px-1 md:px-6 bg-white w-full">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">New products</h2>
          <div className="mt-6 grid grid-cols-12 gap-6">
            {featured && featured.map((product) => (
              <Product key={'new products' + product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}


export async function getServerSideProps(ctx) {
  // // request posts from api
  // let response = await fetch(`${baseUrl}/api/products?limit=4`);
  // // extract the data
  // let result = await response.json();

  return {
    props: {
      featured: productsMock,
    },
  };
}