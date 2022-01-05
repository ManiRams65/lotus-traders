import { Product } from '../components/product';
import { productsMock } from '../mock/data';
import { baseUrl, formatter } from '../config/config'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SearchResult({ products, searchText }) {

    return (
        <main className="w-full px-4 lg:px-8">
            <div className="w-full">
                {products && products.length > 0 ? <div>
                    <h2 className="mt-3">Showing results for '{searchText}'...</h2>
                    <div className="rounded-lg mt-6 grid grid-cols-12 gap-6">
                        {products && products.map((product, indx) => (
                            <Product key={product.id + indx} product={product} />
                        ))}
                    </div>
                </div> : <div>
                    <h2>No products found for '{searchText}'. Try searching some other product name.</h2>
                </div>}
            </div>
        </main>
    )
}


export async function getServerSideProps(ctx) {
    const { text } = ctx.query;

    let response = await fetch(`${baseUrl}/products`);
    // extract the data
    let result = await response.json();
    // // request posts from api
    // let response = await fetch(`${baseUrl}/api/products?limit=4`);
    // // extract the data
    // let result = await response.json();

    return {
        props: {
            products: result ? result : [],
            searchText: text ? text : ''
        },
    };
}