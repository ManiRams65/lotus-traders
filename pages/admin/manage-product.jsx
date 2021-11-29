import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import axios from 'axios'
import { baseUrl } from '../../config/config'
import { useState } from 'react'
import Loader from '../../components/loader';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export default function ManageProduct({ isNew }) {
    const [files, setFiles] = useState([]);
    const [product, setProduct] = useState({ "currency": "$" });
    const [metaData, setMetaData] = useState({});
    const [metaAry, setMetaAry] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const { register, formState: { errors }, reset, handleSubmit } = useForm();

    const handleOnChange = (key, value) => {
        const temp = product;
        temp[key] = key == 'pricePerUnit' || key == 'discountedPrice' ? Number(value) : value;
        setProduct(product)
    }

    const handleMetaData = (key, value) => {
        const temp = metaData;
        const tar = document.getElementById('meta' + key)
        temp[tar.value] = value
        setMetaData(temp);
    }

    const handleFileChange = async (event) => {
        setFiles(event.target.files)
    }

    const addProduct = (data, event) => {
        if (files.length > 0) {
            setLoading(true);
            let tempProd = Object.assign({}, data);
            tempProd['metadata'] = metaData
            axios.post(`${baseUrl}/products`, tempProd)
                .then(res => {
                    const formData = new FormData();
                    for (let i = 0; i < files.length; i++) {
                        formData.append("files", files[i]);
                    }
                    axios.post(`${baseUrl}/images/product/${res.data.id}`, formData)
                        .then(res => {
                            setLoading(false)
                            toast.success("Product added successfully!");
                        })
                        .catch(e => onErr(e));
                })
                .catch(e => onErr(e));
        } else {
            toast.warning("Please add some images!!!");
        }
    }

    const onErr = (err) => {
        console.log(err);
        setLoading(false)
        toast.error("Some error occured, Try again!!!")
    }

    return (
        <div className="flex flex-col py-8 px-2 lg:px-4">

            {loading && <Loader text="Please wait..." />}

            <div className="px-2 mb-5 flex items-center">
                <Link href="/admin/inventory">
                    <a><ArrowLeftIcon className="h-6 w-6 mr-2 text-primary hover:text-secondary" /></a>
                </Link>
                <h1 className="text-md font-bold text-primary">{isNew ? 'Add Product' : 'Edit Product'}</h1>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(addProduct)}>
                    <div className="px-4 py-5 bg-white sm:p-6">
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12">
                                <h1 className="text-primary">
                                    Product details
                                </h1>
                            </div>
                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input type="text" name="product-name" id="product-name"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    {...register("title", { required: true })} />
                                <span className="text-red-500">{errors.title && "Title is required"}</span>
                            </div>
                            {/* onChange={(e) => handleOnChange('title', e.target.value)} */}
                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <input type="text" name="product-description" id="product-description"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    {...register("description", {})} />
                            </div>
                            {/* onChange={(e) => handleOnChange('description', e.target.value)} */}

                            {/* <div className="col-span-4 md:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Category
                                </label>
                                <select id="country" name="country" autoComplete="country-name"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Chairs</option>
                                    <option>Boards</option>
                                    <option>Flowers pots</option>
                                    <option>Hangings</option>
                                </select>
                            </div> */}

                            {/* <div className="col-span-4 md:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Size
                                </label>
                                <select id="country" name="country" autoComplete="country-name"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option>Small</option>
                                    <option>Medium</option>
                                    <option>Large</option>
                                    <option>Extra Large</option>
                                </select>
                            </div> */}
                            <div className="col-span-12 lg:col-span-8">
                                <h5 className="flex items-center">
                                    Meta Data
                                    <PlusIcon className="ml-3 h-5 w-5 text-green-600 hover:cursor-pointer hover:bg-green-50" onClick={() => setMetaAry([...metaAry, {}])} />
                                </h5>
                                {metaAry.map((meta, indx) => (
                                    <div key={'meta' + indx} className="flex items-center my-2">
                                        <input type="text" id={'meta' + indx} placeholder="key"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md mr-4" />
                                        <input type="text" onChange={(e) => handleMetaData(indx, e.target.value)} placeholder="value"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                ))}
                            </div>

                            <div className="col-span-12">
                                <label
                                    htmlFor="file-upload"
                                    className="relative py-2 px-4 cursor-pointer bg-indigo-100 rounded font-medium text-indigo-500 hover:bg-indigo-400 hover:text-white focus-within:outline-none focus-within:ring-none"
                                >
                                    <span>Upload images</span>
                                    <input id="file-upload" name="file-upload" type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e)} className="sr-only" />
                                </label><sup className="text-red-500">*</sup> <span className="mx-5 text-gray-600">{files.length} file selected</span> <span className="py-1 px-3 bg-red-50 text-red-500 rounded hover:shadow-xl hover:bg-red-500 hover:text-white hover:cursor-pointer" onClick={() => setFiles([])}>Clear</span>
                            </div>

                            <div className="mt-5 col-span-12">
                                <h1 className="text-primary">
                                    Pricing details
                                </h1>
                            </div>

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
                                    Price (per unit)<span className="text-red-500">*</span>
                                </label>
                                <input type="number" name="product-price" id="product-price"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    {...register("pricePerUnit", { required: true, valueAsNumber: true })} />
                                <span className="text-red-500">{errors.pricePerUnit && "Title is required"}</span>
                            </div>
                            {/* onChange={(e) => handleOnChange('pricePerUnit', e.target.value)} */}

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
                                    Discounted Price (per unit)
                                </label>
                                <input type="number" name="product-discounted-price" id="product-discounted-price"
                                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    {...register("discountedPrice", { value: -1, valueAsNumber: true })} />
                            </div>
                            {/* onChange={(e) => handleOnChange('discountedPrice', e.target.value)} */}

                            <div className="col-span-4 md:col-span-6">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                    Billing unit<span className="text-red-500">*</span>
                                </label>
                                <select id="country" name="country" autoComplete="country-name"
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    {...register("billingUnit", { required: true })}>
                                    <option value="HOURLY">HOURLY</option>
                                    <option value="DAY">DAY</option>
                                </select>
                                <span className="text-red-500">{errors.billingUnit && "Title is required"}</span>
                            </div>
                            {/* onChange={(e) => handleOnChange('billingUnit', e.target.value)} */}

                        </div>
                    </div>
                    <div className="px-4 py-3 text-right sm:px-6">
                        <button type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white hover:text-white bg-primary-one hover:bg-secondary-one hover:shadow-lg focus:outline-none focus:ring-none"
                        >
                            Save
                        </button>
                        {/* onClick={(e) => addProduct(e)} */}
                    </div>
                </form>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { isNew, id } = ctx.query;

    return {
        props: {
            isNew: isNew
        },
    };
}