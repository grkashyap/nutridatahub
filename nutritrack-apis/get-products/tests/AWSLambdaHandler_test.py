import json

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
    print(type(response))
    assert response['statusCode'] == 200

def test_lambda_event_handler_no_params(monkeypatch):
    env_name = 'URL'
    env_value = 'https://world.openfoodfacts.net/cgi/search.pl'
    monkeypatch.setenv(env_name, env_value)

    event = {
        'queryStringParameters': {
        }
    }

    response = lambda_handler(event=event, context=None)

    assert response['statusCode'] == 500
    assert response['body'] == 'Search term is not populated'

def test_lambda_event_handler_no_event():

    event = { }
    response = lambda_handler(event=event, context=None)

    assert response['statusCode'] == 500
    assert response['body'] == 'An error occurred while processing the request'


if __name__ == '__main__':
    pytest.main()