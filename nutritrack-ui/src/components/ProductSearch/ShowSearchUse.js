import { useContext } from "react";
import ProductResultsContext from "../../context/Products";

export default function ShowSearchUse() {

    const { searchResults, searchValue } = useContext(ProductResultsContext);

    if(searchResults.data !== undefined || searchValue !== '') return;

    return (
        <>
            <div className="flex justify-center items-center bg-brown">
                <div className="text-center bg-white p-8 rounded-lg shadow-lg mt-4">
                    <h1 className="text-3xl font-semibold text-green-600 mb-4 text-center">Welcome to NutridataHub!</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        NutridataHub is your go-to platform for discovering detailed nutritional information about a wide range of food products.
                        Whether you're looking to make healthier choices or simply curious about what's in your favorite items, we've got you covered.
                    </p>
                    <h2 className="text-2xl font-semibold text-green-600 mb-4">Features:</h2>
                    <ul className="list-inside list-disc space-y-4 text-lg text-gray-700">
                    <li>
                        <strong className="font-semibold text-gray-900">Search for Products:</strong> Easily find food products by name to view detailed information on their nutrients, ingredients, and more.
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">Nutrient Breakdown:</strong> Get a comprehensive overview of essential nutrients to make informed dietary choices.
                    </li>
                    <li>
                        <strong className="font-semibold text-gray-900">Ingredient Details:</strong> Learn about the ingredients in each product, including potential allergens and additives.
                    </li>
                    </ul>

                    <p className="mt-6 text-lg text-gray-700">
                    Start exploring now and take control of your nutrition with NutridataHub!
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 bg-brown pb-2">
                <div>
                    <div className="flex justify-center items-center">
                        <svg className="w-full h-96 hidden lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 800">
                            <defs>
                                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" orient="auto" markerWidth="10" markerHeight="10">
                                    <polygon points="0,0 10,5 0,10" fill="black" />
                                </marker>
                            </defs>
                            <path d="M40,500 Q50,60 850,100" stroke="black" strokeWidth="2" fill="transparent" markerEnd="url(#arrowhead)" />
                            <text x="-200" y="600" textAnchor="start" className="text-8xl font-light italic capitalize">
                                Search for Products
                            </text>
                        </svg>
                        <p className="lg:hidden text-lg font-semibold text-black">
                            Search for Products
                        </p>
                    </div>
                </div>
                <div className="ml-2 mr-4 mt-2 border-2 max-w-4xl max-h-2xl bg-white shadow-xl">
                    <video autoPlay loop muted>
                        <source src="Search.webm" type="video/webm" />
                    </video>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-1 lg:grid-cols-2 bg-brown pb-2">
                <p className="lg:hidden text-lg font-semibold text-black capitalize flex justify-center items-center">
                    View Product Details
                </p>
                <div className="ml-2 mr-4 mt-2 border-2 max-w-4xl max-h-2xl shadow-xl bg-white">
                    <img src="Product.png" alt="Search Term Usage" />
                </div>
                <div>
                    <div className="flex justify-center items-center">
                        <svg className="w-full h-96 hidden lg:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 800">
                            <defs>
                                <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" orient="auto" markerWidth="10" markerHeight="10">
                                    <polygon points="0,0 10,5 0,10" fill="black" />
                                </marker>
                            </defs>
                            <path d="M650,500 Q700,50 -300,90" stroke="black" strokeWidth="2" fill="transparent" markerEnd="url(#arrowhead)" />
                            <text x="-100" y="600" textAnchor="start" className="text-8xl font-light italic capitalize">
                                View Product Details
                            </text>
                        </svg>
                    </div>
                </div>
                
            </div>
        </>
    );
}