import { useState, useContext } from "react";
import { GetProducts } from "../utils/GetData";
import ProductResultsContext from "../context/Products";

function SearchField() {

    const [searchTerm, setSearchTermValue] = useState('');
    const [loading, showLoading] = useState(false);
    const [error, showError] = useState(false);

    const { updateSearchResults, updateSearchValue, updatePageNumber } = useContext(ProductResultsContext);

    const onFormSubmit = async (event) => {
        event.preventDefault();
        updateSearchValue(searchTerm);
        updatePageNumber(1);
        showLoading(true);
        const results = await GetProducts(searchTerm);
        showLoading(false);

        if(!results) {
            showError(true);

            setTimeout(() => {
                showError(false);
            }, 3000);
        }
        updateSearchResults(results);
    }

    const onInputValueChange = (event) => {
        setSearchTermValue(event.target.value);
    }

    return (
        <>
            <div className="col-span-4">
                <form onSubmit={onFormSubmit}>
                    <input 
                        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 
                            rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 
                            focus:ring-sky-500 focus:ring-1 sm:text-sm" 
                        placeholder="Search for products..." 
                        type="text" 
                        value={searchTerm}
                        onChange={onInputValueChange}
                        /> 
                </form>
            </div>
            {
                error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">An error occurred while processing request. Please try again.</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                    </div>
                )
            }
            {
                loading && (
                    <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                    </div>
                )
            }
        </>
    )
}

export default SearchField;