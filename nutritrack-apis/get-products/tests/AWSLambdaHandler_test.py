import pytest
from src.AWSLambdaHandler import lambda_handler

def test_lambda_event_handler(monkeypatch):
    env_name = 'URL'
    env_value = 'https://world.openfoodfacts.net/cgi/search.pl'
    monkeypatch.setenv(env_name, env_value)

    event = {
        'queryStringParameters': {
            "search_term": 'coke',
            "page_num": 1
        }
    }

    response = lambda_handler(event=event, context=None)
    print(response)

    assert response['statusCode'] == 200
    assert response['body']['page'] == 1
    assert response['body']['page_size'] == 20
    assert '_id' in response['body']['products'][0]


if __name__ == '__main__':
    pytest.main()