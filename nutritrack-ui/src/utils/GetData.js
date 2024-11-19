import axios from 'axios';

export async function getProducts(search_term, page_num) {

    try {
        const response = await axios.get('http://127.0.0.1:3001/products', {
            params: {
                search_term,
                page_num
            }
        });
    
        return response;
    } catch (error) {
        console.log(error);
    }

    return null;
    
};