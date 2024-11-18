import axios from 'axios';

export function getProducts(search_term, page_num) {

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