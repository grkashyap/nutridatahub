import logging

from src.utils.GetProducts import GetProducts


def lambda_handler(event, context) :
    """
    This method is invoked from AWS lambda
    :param event: event object
    :param context: context
    :return: returns the response for get-products API
    """
    logger = logging.getLogger('Get Products Lambda handler')
    # return an error if event is not populated
    if 'queryStringParameters' not in event or event['queryStringParameters'] is None:
        logger.error('Query String parameters are blank')
        return {
            "statusCode": 500,
            "headers": {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET'
            },
            "body": "An error occurred while processing the request"
        }
    # return an error if search_term is not populated in query parameters
    if 'search_term' not in event['queryStringParameters']:
        logger.error('Search term is blank')
        return {
            "statusCode": 500,
            "headers": {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET'
            },
            "body": "Search term is not populated"
        }

    search_term = event['queryStringParameters']['search_term']

    # default page num to 1 if not included in query parameters
    page_num = 1
    if 'page_num' in event['queryStringParameters']:
        page_num = event['queryStringParameters']['page_num']

    print(f'Processing for Search term: {search_term} and page number: {page_num}')
    return GetProducts(search_term=search_term, page_num=page_num).get_all_products()