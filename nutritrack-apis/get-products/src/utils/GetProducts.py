import os
import requests
from src.utils.RequestException import RequestException
import logging


class GetProducts:

    # Declare variables
    search_term = None
    page_num = None
    result = {}
    logger = logging.getLogger('Get Products')

    def __init__(self, search_term, page_num=1):
        """
        Initialize search term and page number variables
        :param search_term: Search term for which the results have to be retrieved
        :param page_num: Page number of search results. Defaulted to 1
        """
        self.search_term = search_term
        self.page_num = page_num

    def get_all_products(self):
        """
        This method will invoke Open Food facts API to retrieve all products matching the search term
        :return: JSON object with search results
        """

        # send request to open food fact and return response
        try:
            self.__send_request()
        except RequestException as e:
            print(f'Error occurred while retrieving results: {e}')
            self.result['error'] = True

        return self.result

    def __send_request(self):
        """
        Method to send request to open food fact
        :return: response JSON object
        """

        # Get request params
        request_params, request_headers = self.__prepare_params()

        # Get URL
        url = os.environ.get('URL')

        if url is None:
            self.result['error'] = True
            return

        # Send request
        try:
            response = requests.get(url=url, params=request_params, timeout=60, allow_redirects=False, headers=request_headers)
            response.raise_for_status()

            if response.status_code == 200:
                self.result['body'] = response.text

        except requests.exceptions.HTTPError as e:
            print(e)
            self.result['error'] = True
            return

    def __prepare_params(self):
        """
        Prepare request params and header objects which will be sent as part of request
        :return: Tuple with request params and headers
        """

        params = {'search_simple': 1,
                  'json': 1,
                  'fields': 'product_name_en,product_name,_id,image_small_url',
                  'page_size': 20,
                  'search_terms': self.search_term,
                  'page': self.page_num}

        headers = {'User-Agent': 'NutriDataHub/1.0.0'}

        return params, headers