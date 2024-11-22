import { createContext, useState } from "react";

const ProductResultsContext = createContext(null);

export function ProductResultsProvider({ children }) {
    const [searchResults, setSearchResults] = useState({});
    const [searchValue, setSearchValue] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    const searchResultsToShare = {
        searchResults,
        updateSearchResults: (searchResultsFromBackend) => {
            setSearchResults(searchResultsFromBackend)
        },
        searchValue,
        updateSearchValue: (searchTerm) => {
            setSearchValue(searchTerm)
        },
        pageNumber,
        updatePageNumber: (pageNum) => {
            setPageNumber(pageNum)
        }
    };

    return (
        <ProductResultsContext.Provider value={searchResultsToShare}>
            {children}
        </ProductResultsContext.Provider>
    );
}

export default ProductResultsContext;