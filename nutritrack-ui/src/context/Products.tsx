import { createContext, useState } from "react";
import SearchResults from "../components/SearchResults";
import { result } from "../types/types";

const ProductContext = createContext(null);

export function Provider({ children }: any) {
    const [searchResults, setSearchResults] = useState({});

    const searchResultsToShare = {
        searchResults,
        updateSearchResults: (searchResultsFromBackend: result) => {
            setSearchResults(searchResultsFromBackend)
        }
    };

    return (<ProductContext.Provider value={searchResultsToShare}>
        {children}
    </ProductContext.Provider>)
}