import './SearchField.css';

function SearchField() {

    return (
        <div className="search-form">
            <form action='#'>
                <input className="search-field" placeholder="Search for Products" />
            </form>
        </div>
    )
}

export default SearchField;