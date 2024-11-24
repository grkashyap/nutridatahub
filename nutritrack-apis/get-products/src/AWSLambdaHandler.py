import logging

from src.utils.GetProducts import GetProducts


def lambda_handler(event, context) :
    """
    This method is invoked from AWS lambda
    :param event: event object
    :param context: context
    :return: returns the response for get-products API
    """
    _ERROR_STATUS_CODE = 500
    _ERROR_MESSAGE = "An error occurred while processing the request"
    _ERROR_SEARCH_TERM = "Search term is not populated"
    _SUCCESS_STATUS_CODE = 200

    logger = logging.getLogger('Get Products Lambda handler')
    # return an error if event is not populated
    if 'queryStringParameters' not in event or event['queryStringParameters'] is None:
        logger.error('Query String parameters are blank')
        return prepare_response(status_code=_ERROR_STATUS_CODE, error=_ERROR_MESSAGE)

    # return an error if search_term is not populated in query parameters
    if 'search_term' not in event['queryStringParameters']:
        logger.error('Search term is blank')
        return prepare_response(status_code=_ERROR_STATUS_CODE, error=_ERROR_SEARCH_TERM)

    search_term = event['queryStringParameters']['search_term']

    # default page num to 1 if not included in query parameters
    page_num = 1
    if 'page_num' in event['queryStringParameters']:
        page_num = event['queryStringParameters']['page_num']

    print(f'Processing for Search term: {search_term} and page number: {page_num}')
    result = GetProducts(search_term=search_term, page_num=page_num).get_all_products()

    # if error is returned, return error response, else return success response and result from API call
    if 'body' in result:
        # send success response
        return prepare_response(status_code=_SUCCESS_STATUS_CODE, result=result['body'])
    else:
        return prepare_response(status_code=_ERROR_STATUS_CODE, error=_ERROR_MESSAGE)


def prepare_response(status_code, result=None, error=None):
    response = {'statusCode': status_code, 'headers': {}}

    # prepare headers
    response['headers']['Access-Control-Allow-Headers'] = 'Content-Type'
    response['headers']['Access-Control-Allow-Origin'] = '*'
    response['headers']['Access-Control-Allow-Methods'] = 'POST, GET'
    response['headers']['Content-Type'] = 'application/json'

    if result is not None:
        response['body'] = result

    if error is not None:
        response['body'] = error

    return response