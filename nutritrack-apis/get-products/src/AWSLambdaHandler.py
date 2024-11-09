from src.utils.GetProducts import GetProducts


def lambda_handler(event, context) :
    """
    This method is invoked from AWS lambda
    :param event: event object
    :param context: context
    :return: returns the response for get-products API
    """
    search_term = event['queryStringParameters']['search_term']
    page_num = event['queryStringParameters']['page_num']
    print(f'Processing for Search term: {search_term} and page number: {page_num}')
    return GetProducts(search_term=search_term, page_num=page_num).get_all_products()