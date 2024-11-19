import { createContext, useState } from "react";

const ProductResultsContext = createContext(null);

export function ProductResultsProvider({ children }) {
    const [searchResults, setSearchResults] = useState({});

    const searchResultsToShare = {
        searchResults,
        updateSearchResults: (searchResultsFromBackend) => {
            setSearchResults(searchResultsFromBackend)
        }
    };

    return (
        <ProductResultsContext.Provider value={searchResultsToShare}>
            {children}
        </ProductResultsContext.Provider>
    );
}

export default ProductResultsContext;