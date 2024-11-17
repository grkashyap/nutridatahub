import { useState } from "react";
import { getProducts } from "../utils/getData";

function SearchField() {

    const [searchTerm, setSearchTermValue] = useState<string>('');

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getProducts(searchTerm);
    }

    const onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermValue(event.target.value);
    }

    return (
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
    )
}

export default SearchField;