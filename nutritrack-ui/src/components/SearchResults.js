import { useContext, useState } from 'react';
import ProductResultsContext from '../context/Products';
import ResultCard from './ResultCard';
import { GetProducts } from '../utils/GetData';

export default function SearchResults() {

    const { searchResults, updateSearchResults, searchValue, pageNumber, updatePageNumber } = useContext(ProductResultsContext);
    
    const [loading, showLoading] = useState(false);

    if(!searchResults || !searchResults.data) return;


    const placeholder = '__ESCAPED_SINGLE_QUOTE__';
    let resultsStr = searchResults.data;

    resultsStr = resultsStr.replace(/\\'/g, placeholder);

    // Step 1: Replace single quotes around keys (e.g., 'key' -> "key")
    resultsStr = resultsStr.replace(/'(\w+)'(?=\s*:)/g, '"$1"');

    // Step 2: Replace single quotes around non-empty string values (e.g., 'value' -> "value")
    resultsStr = resultsStr.replace(/'([^'{}[\],]+)'(?=\s*,|\s*\})/g, '"$1"');

    // Step 3: Replace single quotes around empty strings (e.g., '' -> "")
    resultsStr = resultsStr.replace(/''/g, '""');

    // Step 4: Restore escaped single quotes (from placeholder back to \' to avoid issues)
    resultsStr = resultsStr.replace(new RegExp(placeholder, 'g'), "\\'");

    let results;

    try {
        results = JSON.parse(resultsStr);
    } catch(error) {
        console.error('Error while parsing response', error);
        return;
    }

    const renderResults = results.products.map((result) => {
        return (
            <ResultCard key={result._id} product={result} />
        )
    });

    const nextPage = async () => {
        const nextPageNum = pageNumber+1;
        updatePageNumber(nextPageNum);
        showLoading(true);
        const results = await GetProducts(searchValue, nextPageNum);
        showLoading(false);
        updateSearchResults(results);
    }

    const previousPage = async () => {
        const prevPageNum = pageNumber-1;
        updatePageNumber(prevPageNum);
        showLoading(true);
        const results = await GetProducts(searchValue, prevPageNum);
        showLoading(false);
        updateSearchResults(results);
    }

    const page_count = results.page_count;
    const count = results.count;
    const num_pages = Math.round(count / page_count);

    return (
        <div className='relative'>
            {
                loading && (
                    <div className='absolute flex space-x-2 justify-center items-center bg-white h-screen inset-0'>
                        <span className='sr-only'>Loading...</span>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
                    </div>
                )
            }
            <div className='grid grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                {renderResults}
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button onClick={previousPage} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
                    <div><p className="text-sm text-gray-700">Showing <span className="font-medium">{pageNumber}</span> of <span className="font-medium">{num_pages}</span> page(s)</p></div>
                    <button onClick={nextPage} className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">Showing <span className="font-medium">{results.page}</span> of <span className="font-medium">{num_pages}</span> pages</p>
                    </div>
                    <div>
                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                            <div>  
                            { pageNumber !== 1 ? (<button onClick={previousPage} className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-white-100 hover:text-white-800 dark:bg-white-800 dark:border-blue-700 dark:text-black-500 dark:hover:bg-white-800 dark:hover:text-black cursor-pointer">
                                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                </svg>
                                Previous
                            </button>): <span></span>}
                            </div>
                            { pageNumber !== num_pages ?  (<button onClick={nextPage} className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-white-100 hover:text-white-800 dark:bg-white-800 dark:border-blue-700 dark:text-black-500 dark:hover:bg-white-800 dark:hover:text-black  cursor-pointer">
                                Next
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </button>): <span></span>}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}