import pytest
import responses

from src.utils.GetProducts import GetProducts

@responses.activate
def test_valid_request(monkeypatch):
    env_name = 'URL'
    env_value = 'https://world.openfoodfacts.net/cgi/search.pl'
    monkeypatch.setenv(env_name,env_value)

    mock_response = {
        "products": [
            {
                "_id": "5449000214799",
                "image_small_url": "https://images.openfoodfacts.net/images/products/544/900/021/4799/front_en.203.200.jpg",
                "product_name": "Coke zero",
                "product_name_en": "Coca Cola Zero"
            }
        ]}

    responses.add(responses.GET, env_value, status=200, json=mock_response)

    search_term = 'coke'

    response = GetProducts(search_term=search_term).get_all_products()

    assert response['statusCode'] == 200

@responses.activate
def test_invalid_request(monkeypatch):
    env_name = 'URL'
    env_value = 'https://world.openfoodfacts.net/cgi/search.pl'
    monkeypatch.setenv(env_name,env_value)

    search_term = 'coke'

    responses.add(responses.GET, env_value, status=500)

    response = GetProducts(search_term=search_term).get_all_products()

    assert response['statusCode'] != 200
    assert response['body'] == 'Error occurred while processing the request'


def test_no_env_variables():
    search_term = 'coke'

    responses.add(responses.GET, 'https://www.google.com', status=500)

    response = GetProducts(search_term=search_term).get_all_products()

    assert response['statusCode'] != 200
    assert response['body'] == 'Error occurred while processing the request'

if __name__== '__main__':
    pytest.main()