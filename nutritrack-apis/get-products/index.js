const axios = require('axios')
axios.defaults.baseURL = "https://world.openfoodfacts.net/cgi";
axios.defaults.headers['User-Agent'] = 'nutritrack/1.0.0'

const getAllProducts = async (search_term, page_num) => {

    const result = {}

    console.log(`Retrieving products for ${search_term} and page no: ${page_num}`)

    try {
      const response = await axios.get('/search.pl',{
        params: {
          search_terms: search_term,
          search_simple: 1,
          json: 1,
          page: page_num,
          fields: 'product_name_en,product_name,_id,image_small_url',
          page_size: 20
        }
      });

      result.status = response.status
      result.body = response.data.products
    } catch(error) {
      throw new Error(`Error retrieving data from open food facts: ${error.message}`)
    }

    return result;
}

exports.handler = async (event) => {

    const search_term = event.queryStringParameters.search_term;
    const page_num = event.queryStringParameters.page_num || 1;

    try {
      const response = await getAllProducts(search_term, page_num)
      return {
        "statusCode": response.status,
        "body": response.body
      };
    } catch(error) {
      return {
        "statusCode": 500,
        "body": JSON.stringify({
          message: 'Error fetching data',
          error: error.message
        })
      };
    }   
}