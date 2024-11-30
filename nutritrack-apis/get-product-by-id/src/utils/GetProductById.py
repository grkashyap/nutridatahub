import logging
import os
import requests

class GetProductById:

    # Define variables
    product_id = None
    result = {}

    logger = logging.getLogger('Get Product by Id')

    def __init__(self, product_id):
        """
        Constructor to initialize product ID
        :param product_id: Product ID
        """
        self.product_id = product_id

    def get_product_by_id(self):
        """
        Method to get product details for a given ID
        :return: JSON object with search results or error
        """

        try:
            self.__send_request()
        except Exception as e:
            self.logger.error(f'Error occurred while processing the request: {e}')
            self.result['error'] = True

        return self.result

    def __send_request(self):
        """
        Method to send actual request
        :return: None
        """
        # Get request params and headers
        request_params, request_headers = self.__prepare_params()

        # Get URL
        url = os.environ.get('URL')

        if url is None:
            self.result['error'] = True
            return

        url = url.format(product_id=self.product_id)

        # Send request
        try:
            response = requests.get(url=url, params=request_params, timeout=60, allow_redirects=False, headers=request_headers)
            response.raise_for_status()

            if response.status_code == 200:
                self.result['body'] = response.text

        except requests.exceptions.HTTPError as e:
            logging.error(e)
            self.result['error'] = True
            return

    def __prepare_params(self):
        """
        Prepare request params and header objects which will be sent as part of request
        :return: Tuple with request params and headers
        """

        params = {}
        headers = {'User-Agent': 'NutriDataHub/1.0.0'}
        return params, headers
