import axios from 'axios';
import config from '../resources/config.json';

export async function GetProducts(search_term, page_num) {

    try {
        const response = await axios.get(`/products`, {
            params: {
                search_term,
                page_num
            },
            baseURL: config.products.URL,
            timeout: config.products.timeout
        });
        return response;
    } catch (error) {
        console.log(error);
        return;
    }
};