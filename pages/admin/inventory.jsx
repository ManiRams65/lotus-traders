import Link from 'next/link'
import { baseUrl, formatter } from '../../config/config'
import { PencilIcon, TrashIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { useState } from 'react';
import Loader from '../../components/loader';

export default function Inventory({ result }) {
  const [products, setProducts] = useState(result);
  const [loading, setLoading] = useState(false);

  const getImgSrc = (product) => {
    const imgObj = product.images[0]
    return imgObj && imgObj.url ? (imgObj.url).toString() : null;
  }

  const deleteProduct = (product) => {
    setLoading(true);
    axios.delete(`${baseUrl}/products/${product.id}`).then(res => {
      setLoading(false)
      const temp = products;
      const indx = temp.findIndex(x => x.id == product.id);
      temp.splice(indx, 1);
      console.log(indx)
      console.log(temp)
      setProducts([...temp]);
    }).catch(e => setLoading(false));
  }

  return (
    <div className="flex flex-col">
      {loading && <Loader text="Please wait..." />}
      <div className="my-5 md:my-10 overflow-x-auto mx-6 lg:mx-8">
        <div className="px-2 py-1 mb-2 w-full flex items-center justify-between">
          <h1 className="text-md font-bold">Inventory</h1>
          <Link href={{
            pathname: '/admin/manage-product',
            query: { isNew: true },
          }}>
            <button className="px-2 py-1 flex items-center text-white bg-green-500 rounded focus:outline-none focus:ring-none hover:shadow-xl">
              + <span className="ml-2">Add product</span>
            </button>
          </Link>
        </div>
        <div className="py-2 align-middle inline-block min-w-full px-2 lg:px-4">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Currency
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price per unit
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Discounted price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Billing unit
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getImgSrc(product) && <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={getImgSrc(product)} alt={product.title} />
                        </div>}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-500 whitespace-nowrap">
                      {product.currency == '$' ? 'USD' : product.currency}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-right whitespace-nowrap">
                      {formatter.format(Number(product.pricePerUnit))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">{product.discountedPrice > 0 ? formatter.format(Number(product.discountedPrice)) : 'No discount'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">{product.billingUnit}</td>
                    <td className="px-6 py-4 flex items-center justify-center">
                      <PencilIcon className="h-6 w-6 text-yellow-500 hover:cursor-pointer hover:bg-yellow-50 mr-3" />
                      <TrashIcon className="h-6 w-6 text-red-500 hover:cursor-pointer hover:bg-red-50" onClick={() => deleteProduct(product)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getServerSideProps(ctx) {
  // request products from api
  let response = await fetch(`${baseUrl}/products`);
  // extract the data
  let result = await response.json();

  return {
    props: {
      result
    },
  };
}