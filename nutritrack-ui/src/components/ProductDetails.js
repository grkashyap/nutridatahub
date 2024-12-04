import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetProductById } from '../utils/GetData';
import ImageCarousel from "./ImageCarousel";
import ProductDetailsTab from "./ProductDetailsTabs";

export default function ProductDetails() {

    const params = useParams();
    const productId = params.productId;

    const navigate = useNavigate();
    const location = useLocation();

    const [productDetails, setProductDetails] = useState(null);
    const [error, showError] = useState(false);
    const [loading, showLoading] = useState(true);

    useEffect(()=> {

        const fetchProductDetails = async () => {
            if(!productId) {
                showError(true);
                return;
            }
    
            if(!productDetails) {
                const response = await GetProductById(productId);

                showLoading(false);
                if(!response || !response.data || response.data.count === 0) {
                    showError(true);
                    return;
                }
                setProductDetails(response.data); 
            }
        };

        fetchProductDetails();
    },[]);
    
    const handleBackButton = () => {
        if (location.state?.fromSearch) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }

    return (
        <div>
            {
                loading && (
                    <div className='flex space-x-2 justify-center items-center bg-white h-screen inset-0'>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                    </div>
                )
            }
            {
                error && (
                    <div className="flex h-screen items-center justify-center ">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">An error occurred while processing request. Please try again.</span>
                            <button type="button" onClick={handleBackButton} className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-red border border-gray-300 rounded-lg hover:bg-white-100 hover:text-white-800 dark:bg-white-800 dark:border-blue-700 dark:text-black-500 dark:hover:bg-white-800 dark:hover:text-black cursor-pointer">
                                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                </svg>
                                Back
                            </button>
                        </div>
                    </div>
                )
            }
            {
                (!loading && !error) && (
                    <div className="flex flex-col flex-grow-0 md:container md:mx-auto shadow-xl min-h-screen bg-white m-4">
                        <div className="flex-1 gap-y-2">
                            <div className="m-2">
                                <button type="button" onClick={handleBackButton} className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-white-100 hover:text-white-800 dark:bg-white-800 dark:border-blue-700 dark:text-black-500 dark:hover:bg-white-800 dark:hover:text-black cursor-pointer">
                                    <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                    </svg>
                                    Back
                                </button>
                                <div className="flex mt-4 ml-2">
                                    <div className="grid grid-rows-2 grid-cols-1 md:grid-cols-2 md:gap-2 w-full">
                                        <div className="row-span-2 col-span-1">
                                            <ImageCarousel images={!productDetails?{}:productDetails?.product.selected_images} />
                                        </div>
                                        <div className="row-span-2 col-span-1">
                                            <ProductDetailsTab product={productDetails.product} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}