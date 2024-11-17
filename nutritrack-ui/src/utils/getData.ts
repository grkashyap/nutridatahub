import axios from 'axios';
import UrlProvider from './UrlProvider';

const url = UrlProvider.

export function getProducts(search_term: string, page_num?: Number) {

    axios.get('http://127.0.0.1:3001/products', {
        params: {
            search_term,
            page_num
        }
    }).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });
};