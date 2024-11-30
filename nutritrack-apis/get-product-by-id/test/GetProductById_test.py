import pytest
import responses

from src.utils.GetProductById import GetProductById

@responses.activate
def test_valid_request(monkeypatch):
    product_id = '5449000214799'
    env_name = 'URL'
    env_value = f'https://world.openfoodfacts.org/api/v3/product/{product_id}.json'
    monkeypatch.setenv(env_name,env_value)

    mock_response = {
        "product": [
            {
                "_id": product_id,
                "product_name": "Coke zero"
            }
        ]}

    responses.add(responses.GET, env_value, status=200, json=mock_response)

    response = GetProductById(product_id=product_id).get_product_by_id()

    assert 'body' in response

@responses.activate
def test_invalid_request(monkeypatch):
    product_id = '5449000214799'
    env_name = 'URL'
    env_value = 'https://world.openfoodfacts.org/api/v3/product/{product_id}.json'
    monkeypatch.setenv(env_name,env_value)

    responses.add(responses.GET, env_value, status=500)

    response = GetProductById(product_id=product_id).get_product_by_id()

    assert response['error'] == True


def test_no_env_variables():

    responses.add(responses.GET, 'https://www.google.com', status=500)

    response = GetProductById(product_id='5449000214799').get_product_by_id()

    assert response['error'] == True

if __name__== '__main__':
    pytest.main()