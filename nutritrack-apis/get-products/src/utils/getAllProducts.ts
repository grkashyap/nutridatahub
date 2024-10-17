import axios from 'axios';
import { result } from './types'

axios.defaults.baseURL = "https://world.openfoodfacts.net/cgi";
axios.defaults.headers['User-Agent'] = 'nutritrack/1.0.0'

async function getAllProducts(searchTerm: string, pageNo?: Number) : Promise<result> {
    
    const result = {} as result;

    try {
        const response = await axios.get('/search.pl',{
            params: {
              search_terms: searchTerm,
              search_simple: 1,
              json: 1,
              page: pageNo,
              fields: 'product_name_en,product_name,_id,image_small_url',
              page_size: 20
            }
          });

          result.status = response.status;
          result.data = response.data.products;
          result.hasError = false;

          return result;

    } catch(error) {
        console.log(`Error while retrieving data from open food fact for search term ${searchTerm}: {error.message}`);
        result.status = 500;
        result.hasError = true;
        result.error = `{error.message}`

        return result;
    }
}

export default getAllProducts;