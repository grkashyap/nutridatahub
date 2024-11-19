import { useContext } from 'react';
import ProductResultsContext from '../context/Products';
import ResultCard from './ResultCard';

export default function SearchResults() {

    const { searchResults } = useContext(ProductResultsContext);

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

    return (
        <div className='grid grid-cols-4 gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {renderResults}
        </div>
    );
}