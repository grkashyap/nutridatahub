import logging
from typing import Final

from src.utils.GetProductById import GetProductById


def lambda_handler(event, context):
    """
    This method is invoked from AWS lambda
    :param event: event object
    :param context: context
    :return: returns the response from get-product-by-id API
    """
    _ERROR_STATUS_CODE: Final = 500
    _ERROR_MESSAGE: Final = "An error occurred while processing the request"
    _ERROR_PRODUCT_ID: Final = "Product ID is blank"
    _SUCCESS_STATUS_CODE: Final = 200

    logger = logging.getLogger('Get Product by Id API')


    # return an error if event is not populated
    if 'pathParameters' not in event or event['pathParameters'] is None:
        logger.error('Path parameters are blank')
        return prepare_response(status_code=_ERROR_STATUS_CODE, error=_ERROR_MESSAGE)

    # return an error if search_term is not populated in query parameters
    if 'productId' not in event['pathParameters']:
        logger.error('Product ID is blank')
        return prepare_response(status_code=_ERROR_STATUS_CODE, error=_ERROR_PRODUCT_ID)

    product_id = event['pathParameters']['productId']
    logger.info(f'product_id: {product_id}')

    result = GetProductById(product_id=product_id).get_product_by_id()

    # if error is returned, return error response, else return success response and result from API call
    if 'body' in result:
        return prepare_response(status_code=_SUCCESS_STATUS_CODE, result=result['body'])
    else:
        return prepare_response(status_code=_ERROR_STATUS_CODE, error=_ERROR_MESSAGE)


def prepare_response(status_code, result=None, error=None):
    response = {'statusCode': status_code, 'headers': {}}

    # prepare headers
    response['headers']['Access-Control-Allow-Headers'] = 'Content-Type'
    response['headers']['Access-Control-Allow-Origin'] = 'https://www.nutridatahub.com/'
    response['headers']['Access-Control-Allow-Methods'] = 'POST, GET'
    response['headers']['Content-Type'] = 'application/json'

    if result is not None:
        response['body'] = result

    if error is not None:
        response['body'] = error

    return response